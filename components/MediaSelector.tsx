import { captureException } from '@rainwalk/logging';
import { Actionsheet } from 'native-base';
import { useCallback } from 'react';
import { Platform } from 'react-native';
import DocumentPicker, { isCancel, types } from 'react-native-document-picker';
import {
  type ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export interface SelectedMedia {
  name: string;
  size: number;
  type: string;
  uri: string;
}

export interface MediaSelectorProps {
  allowMultiSelection?: boolean;
  fileTypes: (keyof typeof types)[];
  isOpen: boolean;
  onClose: () => unknown;
  onSelectMedia: (selectedMedia: SelectedMedia[]) => unknown;
}

/**
 * The MediaSelector component allows selecting media files from camera roll or
 * file system and returns them as an array of SelectedMedia objects with
 * customizable behavior.
 *
 * @component
 * @param {Object} props
 * @param {boolean} [props.allowMultiSelection] - [iOS only] Allows selecting
 * multiple files. Default is undefined.
 * @param {Array} props.fileTypes - Array of strings that specifies the types of
 * files that can be selected.
 * @param {boolean} props.isOpen - Controls whether the Actionsheet is open or
 * closed.
 * @param {Function} props.onClose - Handles the Actionsheet closing.
 * @param {Function} props.onSelectMedia - Handles the selected media files.
 */
const MediaSelector = ({
  allowMultiSelection,
  fileTypes,
  isOpen,
  onClose,
  onSelectMedia,
}: MediaSelectorProps) => {
  const openDocumentPicker = useCallback(async () => {
    const documentPickerResponse = await DocumentPicker.pick({
      allowMultiSelection:
        Platform.OS === 'android' ? false : allowMultiSelection,
      copyTo: 'cachesDirectory',
      presentationStyle: 'fullScreen',
      type: fileTypes.map((type) => types[type]),
    });

    onSelectMedia(
      documentPickerResponse.map((file) => ({
        uri:
          file.fileCopyUri ??
          (Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri),
        name: file.name ?? '',
        size: file.size ?? 0,
        type: file.type ?? '',
      }))
    );
  }, [allowMultiSelection, fileTypes, onSelectMedia]);

  const handleImagePickerResponse = useCallback(
    (imagePickerResponse: ImagePickerResponse) => {
      if (!imagePickerResponse.assets) return;
      onSelectMedia(
        imagePickerResponse.assets.map((asset) => ({
          uri:
            (Platform.OS === 'ios'
              ? asset.uri?.replace('file://', '')
              : asset.uri) ?? '',
          name: asset.fileName ?? '',
          size: asset.fileSize ?? 0,
          type: asset.type ?? '',
        }))
      );
    },
    [onSelectMedia]
  );

  const openPhotoLibrary = useCallback(async () => {
    const imagePickerResponse = await launchImageLibrary({
      mediaType: 'photo',
    });
    handleImagePickerResponse(imagePickerResponse);
  }, [handleImagePickerResponse]);

  const openCamera = useCallback(async () => {
    const imagePickerResponse = await launchCamera({ mediaType: 'photo' });
    handleImagePickerResponse(imagePickerResponse);
  }, [handleImagePickerResponse]);

  const documentPickerErrorCapture = (e: Error) => {
    if (!isCancel(e)) {
      captureException(e);
    }
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Actionsheet.Item
          onPress={() => {
            openCamera().catch(captureException);
          }}
        >
          Take a Photo
        </Actionsheet.Item>
        <Actionsheet.Item
          onPress={() => {
            openPhotoLibrary().catch(captureException);
          }}
        >
          Photo Library
        </Actionsheet.Item>
        <Actionsheet.Item
          onPress={() => {
            openDocumentPicker().catch(documentPickerErrorCapture);
          }}
        >
          Browse
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

MediaSelector.defaultProps = {
  allowMultiSelection: undefined,
};

export default MediaSelector;
