import MediaSelector, {
  type SelectedMedia,
} from '@rainwalk/components/MediaSelector';
import {
  ArrowUpIcon,
  Box,
  Center,
  DeleteIcon,
  HStack,
  IconButton,
  Pressable,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import type { FunctionComponent } from 'react';
import React, { useCallback, useMemo, useState } from 'react';

export interface IClaimsDocumentUploadProps {
  filesToUpload?: SelectedMedia[];
  onChangeFilesToUpload?: (filesToUpload: SelectedMedia[]) => unknown;
  readonly?: boolean;
}

const ClaimsDocumentUpload: FunctionComponent<IClaimsDocumentUploadProps> = ({
  filesToUpload: propsFilesToUpload,
  onChangeFilesToUpload,
  readonly,
}) => {
  const {
    isOpen: mediaSelectorIsOpen,
    onOpen: onMediaSelectorOpen,
    onClose: onMediaSelectorClose,
  } = useDisclose();
  const [filesToUpload, setFilesToUpload] = useState<SelectedMedia[]>(
    propsFilesToUpload ?? []
  );

  const removeFileToUpload = useCallback(
    (uriToRemove: string) => {
      const newFilesToUpload = filesToUpload.filter(
        (file) => uriToRemove !== file.uri
      );
      setFilesToUpload(newFilesToUpload);
      onChangeFilesToUpload?.(newFilesToUpload);
    },
    [filesToUpload, setFilesToUpload, onChangeFilesToUpload]
  );

  const onSelectMedia = useCallback(
    (selectedMedia: SelectedMedia[]) => {
      const newFilesToUpload = filesToUpload.concat(selectedMedia);
      setFilesToUpload(newFilesToUpload);
      onChangeFilesToUpload?.(newFilesToUpload);
    },
    [filesToUpload, setFilesToUpload, onChangeFilesToUpload]
  );

  const ListOfFilesToUpload = useMemo(
    () => (
      <>
        {filesToUpload.length > 0 ? <Text>Attached:</Text> : <Text />}
        {filesToUpload.map((file) => (
          <HStack
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            key={file.uri}
          >
            <Text
              width="100%"
              flexShrink={1}
              textAlign="left"
              _light={{
                color: '#828282',
              }}
            >
              {file.name}
            </Text>
            {!readonly && (
              <IconButton
                size="sm"
                colorScheme="trueGray"
                icon={<DeleteIcon size="5" />}
                onPress={() => {
                  removeFileToUpload(file.uri);
                }}
              />
            )}
          </HStack>
        ))}
      </>
    ),
    [filesToUpload, readonly, removeFileToUpload]
  );

  return (
    <>
      <VStack>
        {ListOfFilesToUpload}
        <Pressable onPress={readonly ? undefined : onMediaSelectorOpen}>
          <Box
            bgColor={readonly ? 'rainwalkGray.50' : 'white'}
            borderColor="#828282"
            borderRadius={4}
            borderWidth={1}
            p="6"
            rounded="xl"
            _text={{
              textAlign: 'center',
            }}
          >
            <Center>
              <ArrowUpIcon size="6" color="#828282" />
              <Text
                color="#828282"
                fontWeight="700"
                fontSize={15}
                textTransform="capitalize"
                paddingTop={4}
              >
                Upload Document
              </Text>
            </Center>
          </Box>
        </Pressable>
      </VStack>
      <MediaSelector
        fileTypes={['images', 'pdf', 'doc', 'docx', 'xls', 'xlsx']}
        isOpen={mediaSelectorIsOpen}
        onClose={onMediaSelectorClose}
        onSelectMedia={onSelectMedia}
      />
    </>
  );
};
ClaimsDocumentUpload.defaultProps = {
  filesToUpload: undefined,
  onChangeFilesToUpload: undefined,
  readonly: undefined,
};

export default ClaimsDocumentUpload;
