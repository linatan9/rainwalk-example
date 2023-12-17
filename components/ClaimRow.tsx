import ArrowForward from '@material-design-icons/svg/filled/arrow_forward_ios.svg';
import type { Claim, ClaimStatusEnum, Policy } from '@rainwalk/api';
import {
  Center,
  HStack,
  Icon,
  Pressable,
  Skeleton,
  Text,
  VStack,
} from 'native-base';
import type { FunctionComponent } from 'react';
import type { z } from 'zod';

const claimStatusToColorMap: Record<z.infer<typeof ClaimStatusEnum>, string> = {
  'Payment Issued': 'success.400',
  'Closed Without Payment': 'error.600',
  'In Progress': 'warning.400',
  Open: 'rainwalkGray.300',
  'Need Documentation': 'warning.400',
  Closed: 'rainwalkGray.400',
};

interface ClaimRowProps {
  claim?: z.infer<typeof Claim>;
  onClick?: (id: number) => void;
  policy?: z.infer<typeof Policy>;
}

const ClaimRow: FunctionComponent<ClaimRowProps> = ({
  claim,
  policy,
  onClick,
}) => (
  <Pressable
    onPress={() => {
      onClick?.(claim?.id ?? -1);
    }}
  >
    <HStack alignItems="center" space={2}>
      <VStack flex={1}>
        <HStack alignItems="center" justifyContent="space-between" space={2}>
          <Skeleton
            isLoaded={Boolean(claim)}
            h="24px"
            w={{ base: '80px', md: '200px' }}
            mb="2"
          >
            <Text
              fontSize={{ base: 'xs', md: 'lg' }}
              fontWeight="bold"
              color={
                claim?.status !== undefined
                  ? claimStatusToColorMap[claim.status]
                  : 'rainwalkGray.300'
              }
            >
              {claim?.status ?? 'Unknown'}
            </Text>
          </Skeleton>
          <Skeleton
            isLoaded={Boolean(claim)}
            h="24px"
            w={{ base: '80px', md: '200px' }}
            mb="2"
          >
            <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="medium">
              {`CLAIM #${claim?.claim_number ?? ''}`}
            </Text>
          </Skeleton>
        </HStack>
        <HStack alignItems="center" justifyContent="space-between" space={2}>
          <Skeleton
            isLoaded={Boolean(claim)}
            h="24px"
            w={{ base: '140px', md: '200px' }}
          >
            <Text
              ellipsizeMode="middle"
              flexShrink={1}
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="medium"
              isTruncated
            >
              {`${policy?.quote.pet.pet_name ?? ''}'s claim`}
            </Text>
          </Skeleton>
          <Skeleton
            isLoaded={Boolean(claim)}
            h="24px"
            w={{ base: '140px', md: '200px' }}
          >
            <Text fontSize={{ base: 'xs', md: 'sm' }}>
              {`Submitted date ${claim?.created_at.toLocaleDateString() ?? ''}`}
            </Text>
          </Skeleton>
        </HStack>
      </VStack>
      <Center>
        <Icon
          as={<ArrowForward width={13} height={13} />}
          color="rainwalkGray.300"
          fill="currentColor"
        />
      </Center>
    </HStack>
  </Pressable>
);

ClaimRow.defaultProps = {
  claim: undefined,
  onClick: undefined,
  policy: undefined,
};

export { ClaimRow, claimStatusToColorMap };
