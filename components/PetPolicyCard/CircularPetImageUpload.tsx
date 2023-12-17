import Camera from '@material-design-icons/svg/filled/photo_camera.svg';
import { apiHooks } from '@rainwalk/api';
import MediaSelector, {
  type SelectedMedia,
} from '@rainwalk/components/MediaSelector';
import { captureException } from '@rainwalk/logging';
import type { IAvatarProps } from 'native-base';
import { Avatar, Icon, Pressable, Skeleton, useDisclose } from 'native-base';
import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';

export interface CircularPetImageUploadProps extends IAvatarProps {
  petId?: string;
}

const CircularPetImageUpload: FunctionComponent<
  CircularPetImageUploadProps
> = ({ petId, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const {
    data: { image: { image: petImageUrl } } = { image: { image: undefined } },
    invalidate: invalidatePetImage,
    isLoading,
  } = apiHooks.useGet(
    '/insured/pet/image/lookup/:id/',
    { params: { id: petId ?? '' } },
    { enabled: petId !== undefined }
  );
  const { mutate } = apiHooks.usePost('/insured/pet/image/create_update/:id/', {
    params: { id: petId ?? '' },
  });

  const onSelectMedia = useCallback(
    (selectedMedia: SelectedMedia[]) => {
      mutate(
        { image: selectedMedia[0] },
        {
          onSuccess: () => {
            invalidatePetImage().catch(captureException);
          },
        }
      );
    },
    [mutate, invalidatePetImage]
  );

  return (
    <Pressable onPress={onOpen} overflow="hidden">
      <Avatar
        bg={!isLoading ? 'rainwalkGray.200' : 'white'}
        source={{
          uri: petImageUrl ?? undefined,
        }}
        {...rest}
      >
        <Skeleton isLoaded={!isLoading} w="full" h="full">
          <Icon
            as={<Camera width={24} height={24} />}
            fill="currentColor"
            color="rainwalkGray.400"
          />
        </Skeleton>
      </Avatar>
      <MediaSelector
        fileTypes={['images']}
        isOpen={isOpen}
        onClose={onClose}
        onSelectMedia={onSelectMedia}
      />
    </Pressable>
  );
};

CircularPetImageUpload.defaultProps = {
  petId: undefined,
};

export default CircularPetImageUpload;
