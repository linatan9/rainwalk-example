import { apiHooks } from '@rainwalk/api';
import FileAttachmentIcon from '@rainwalk/assets/file-attachment-icon.svg';
import { claimStatusToColorMap } from '@rainwalk/components/ClaimRow';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import type { ClaimsStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import {
  Box,
  Button,
  HStack,
  Icon,
  Text,
  useBreakpointValue,
  VStack,
} from 'native-base';
import type { FunctionComponent } from 'react';
import React, { useMemo } from 'react';

const borderRadius = '2xl';

interface SectionProps {
  title: string;
}
const SectionTitle: FunctionComponent<SectionProps> = ({ title }) => {
  return (
    <Text
      color="rainwalkGray.400"
      fontSize={{
        base: 'sm',
        sm: '2xl',
      }}
      fontWeight="semibold"
    >
      {title}
    </Text>
  );
};

interface SectionDescriptionProps {
  description: string;
}

const SectionDescription: FunctionComponent<SectionDescriptionProps> = ({
  description,
}) => {
  return (
    <Text
      color="rainwalkGray.400"
      fontSize={{
        base: 'sm',
        sm: 'md',
        lg: 'lg',
      }}
      isTruncated
      mb={{
        base: 1,
        sm: 2,
      }}
    >
      {description}
    </Text>
  );
};
const ClaimView: FunctionComponent<ClaimsStackScreenProps<'ClaimView'>> = ({
  route,
  navigation,
}) => {
  const { claimId, petName } = route.params;
  const fileAttachmentIconSizePixels: number = useBreakpointValue({
    base: 14,
    sm: 24,
  });
  const { data: claim } = apiHooks.useGet('/insured/claim/:id', {
    params: {
      id: claimId,
    },
  });
  const Attachments = useMemo(
    () =>
      claim?.receipt_urls.map((recieptURL) => (
        <Text
          key={recieptURL}
          color="rainwalkGray.400"
          fontSize={{
            base: 'sm',
            sm: 'md',
            lg: 'lg',
          }}
          isTruncated
          mb={{
            base: 1,
            sm: 2,
          }}
          alignItems="center"
        >
          <Icon
            as={
              <FileAttachmentIcon
                width={fileAttachmentIconSizePixels}
                height={fileAttachmentIconSizePixels}
              />
            }
            color="rainwalkGray.300"
            fill="currentColor"
          />
          {` ${recieptURL.replace('receipts/', '')}`}
        </Text>
      )),
    [claim, fileAttachmentIconSizePixels]
  );
  return (
    <ScreenLayout hideBackButton>
      <RainwalkCard
        title={{
          text: 'CLAIM DETAILS',
          _Text: { color: 'rainwalkGray.400' },
        }}
      >
        <VStack space="3" mb="4">
          <HStack alignItems="center">
            <Box
              mr="2"
              w="2"
              h="2"
              borderRadius={borderRadius}
              bg={
                claim?.status
                  ? claimStatusToColorMap[claim.status]
                  : 'rainwalkGray.300'
              }
            />
            <Text
              fontSize={{ base: 'sm', md: 'lg' }}
              fontWeight="bold"
              color={
                claim?.status !== undefined
                  ? claimStatusToColorMap[claim.status]
                  : 'rainwalkGray.300'
              }
            >
              {claim?.status ?? 'Unknown'}
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Text
              color="rainwalkMidnightBlue.400"
              fontSize={{
                base: 'xl',
                sm: '2xl',
              }}
              fontWeight="bold"
            >
              {petName ?? ''}
            </Text>
            <Text
              color="rainwalkDarkBrown.400"
              mt="1"
              ml="2"
              fontSize={{
                base: 'sm',
                sm: 'md',
                lg: '2xl',
              }}
              fontWeight={{
                base: 'bold',
                lg: 'normal',
              }}
            >
              {`CLAIM #${claim?.claim_number ?? ''}`}
            </Text>
          </HStack>
          <VStack space="1">
            <SectionTitle title="Submitted Date:" />
            <Text
              color="rainwalkGray.400"
              fontSize={{
                base: 'md',
                sm: '2xl',
              }}
            >
              {claim?.created_at.toLocaleDateString() ?? ''}
            </Text>
          </VStack>
          <VStack space="1">
            <SectionTitle title="Attached documents:" />
            {Attachments}
          </VStack>
          <VStack space="1">
            <SectionTitle title="Diagnosis" />
            <SectionDescription description={claim?.condition_type ?? ''} />
          </VStack>
          <VStack space="1">
            <SectionTitle title="Treatment Cost" />
            <SectionDescription
              description={`$ ${claim?.treatment_cost ?? 0.0}`}
            />
          </VStack>
          <VStack space="1">
            <SectionTitle title="Veterinarian Practice" />
            <SectionDescription
              description={claim?.veterinarian_practice ?? ''}
            />
          </VStack>
          <VStack space="1">
            <SectionTitle title="Veterinarian" />
            <SectionDescription description={claim?.veterinarian ?? ''} />
          </VStack>
          <VStack space="1">
            <SectionTitle title="Tell us what happened" />
            <SectionDescription description={claim?.condition_summary ?? ''} />
          </VStack>
          <HStack justifyContent="center">
            <Button
              colorScheme="primary"
              variant="outline"
              onPress={navigation.goBack}
            >
              Back
            </Button>
          </HStack>
        </VStack>
      </RainwalkCard>
    </ScreenLayout>
  );
};

export default ClaimView;
