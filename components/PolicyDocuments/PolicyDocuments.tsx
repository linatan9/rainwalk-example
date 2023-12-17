import DownloadIcon from '@material-design-icons/svg/outlined/file_download.svg';
import type { Policy } from '@rainwalk/api';
import { apiHooks } from '@rainwalk/api';
import { captureException } from '@rainwalk/logging';
import {
  HStack,
  Icon,
  Pressable,
  Spinner,
  Text,
  useBreakpointValue,
  useToast,
} from 'native-base';
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { Platform } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share';
import type { z } from 'zod';

const downloadDocument = async ({
  fileName,
  toast,
  url,
}: {
  fileName: string;
  toast: ReturnType<typeof useToast>;
  url?: string;
}) => {
  if (url === undefined) return;
  const fetchBlobResponse = await ReactNativeBlobUtil.config({
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mime: 'application/pdf',
      title: fileName,
    },
    appendExt: 'pdf',
    fileCache: true,
    path: `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}.pdf`,
  })
    .fetch('GET', url)
    .catch(() => undefined);

  if (!fetchBlobResponse) {
    toast.show({
      title: 'Download failed',
      description: `Failed to download pdf`,
    });
    return;
  }

  if (Platform.OS !== 'ios') {
    return;
  }

  await Share.open({
    url: fetchBlobResponse.path(),
    type: 'application/pdf',
    saveToFiles: true,
  }).catch((e) => {
    if (e?.code === 'CANCELLED') return;
    toast.show({
      title: 'Something went wrong',
      description: e?.message,
    });
    captureException(e as Error);
  });
};

interface PolicyDocumentsProps {
  policies?: z.infer<typeof Policy>[];
}

const PolicyDocuments: FunctionComponent<PolicyDocumentsProps> = ({
  policies,
}) => {
  const toast = useToast();
  const [currentlyDownloadingDocument, setCurrentlyDownloadingDocument] =
    useState('');

  const downloadIconSizePixels: number = useBreakpointValue({
    base: 28,
    sm: 36,
  });

  return (
    <>
      {policies?.map((policy) => {
        const fileName = [
          policy.quote.pet.pet_name.replace(/\s/g, '-'),
          policy.policy_number,
          policy.issued_date
            .toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })
            .replace(/\s/g, ''),
        ]
          .join('-')
          .replace(/\s/g, '-');

        return (
          <Pressable
            key={fileName}
            isDisabled={currentlyDownloadingDocument !== ''}
            onPress={() => {
              if (currentlyDownloadingDocument !== '') return;
              setCurrentlyDownloadingDocument(fileName);
              downloadDocument({
                fileName,
                toast,
                url: policy.document_link ?? '',
              })
                .catch(captureException)
                .finally(() => {
                  setCurrentlyDownloadingDocument('');
                });
            }}
          >
            <HStack
              alignItems="center"
              justifyContent="space-between"
              pb={{ base: 3, sm: 4 }}
            >
              <Text
                color="rainwalkDarkestBrown.400"
                ellipsizeMode="middle"
                flex={1}
                fontSize={{ base: 'sm', sm: 'md' }}
                fontWeight="bold"
                isTruncated
              >
                {fileName}
              </Text>
              {currentlyDownloadingDocument === fileName ? (
                <Spinner
                  color="rainwalkRustRed.400"
                  h={`${downloadIconSizePixels}px`}
                  w={`${downloadIconSizePixels}px`}
                />
              ) : (
                <Icon
                  as={
                    <DownloadIcon
                      width={downloadIconSizePixels}
                      height={downloadIconSizePixels}
                    />
                  }
                  color="rainwalkRustRed.400"
                  fill="currentColor"
                />
              )}
            </HStack>
          </Pressable>
        );
      })}
    </>
  );
};

PolicyDocuments.defaultProps = {
  policies: undefined,
};

const PolicyDocumentsControlled: FunctionComponent = () => {
  const { data: { policies } = { policies: undefined } } =
    apiHooks.useGet('/insured/policy/');

  return <PolicyDocuments policies={policies} />;
};

export { PolicyDocuments };
export default PolicyDocumentsControlled;
