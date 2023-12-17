import MediaSelector, {
  type MediaSelectorProps,
  type SelectedMedia,
} from '@rainwalk/components/MediaSelector';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react-native';
import { Button, Center, useDisclose, VStack } from 'native-base';

const logSelectedMedia = (selectedMedia: SelectedMedia[]) => {
  action(JSON.stringify(selectedMedia, null, 2))();
};

interface MediaSelectorWithButtonProps
  extends Pick<MediaSelectorProps, 'fileTypes'> {
  text: string;
}

const MediaSelectorWithButton = ({
  fileTypes,
  text,
}: MediaSelectorWithButtonProps) => {
  const { isOpen, onClose, onOpen } = useDisclose();
  return (
    <>
      <Button onPress={onOpen}>{text}</Button>
      <MediaSelector
        onClose={onClose}
        isOpen={isOpen}
        fileTypes={fileTypes}
        onSelectMedia={logSelectedMedia}
      />
    </>
  );
};

export default {
  component: MediaSelector,
  decorators: [
    (Story) => (
      <Center alignContent="center" w="full" h="full" p="4">
        <Story />
      </Center>
    ),
  ],
} as Meta<typeof MediaSelector>;

export const All = {
  render: () => (
    <VStack space={4}>
      <MediaSelectorWithButton fileTypes={['images']} text="select photo" />
      <MediaSelectorWithButton
        fileTypes={['allFiles']}
        text="select all files"
      />
      <MediaSelectorWithButton fileTypes={['pdf']} text="select pdfs" />
    </VStack>
  ),
};
