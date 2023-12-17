import type { Claim, ClaimStatusEnum, Policy } from '@rainwalk/api';
import { apiHooks } from '@rainwalk/api';
import { useAnalytic } from '@rainwalk/components/AnalyticProvider';
import { ClaimRow } from '@rainwalk/components/ClaimRow';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import type { ClaimsStackParamList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack';
import type { HomeStackParamList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/HomeStack';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Button, Center, Text, VStack } from 'native-base';
import type { FunctionComponent } from 'react';
import { useMemo } from 'react';
import type { z } from 'zod';

interface RecentClaimsCardProps {
  claims?: z.infer<typeof Claim>[];
  hideSeeAllClaimsButton?: boolean;
  hideSubmitClaimButton?: boolean;
  onPressClaim: (id: number) => unknown;
  onPressSeeAllClaims: () => unknown;
  onPressSubmitClaim: () => unknown;
  policies?: z.infer<typeof Policy>[];
  title: string;
}

const RecentClaimsCard: FunctionComponent<RecentClaimsCardProps> = ({
  claims,
  hideSeeAllClaimsButton,
  hideSubmitClaimButton,
  onPressClaim,
  onPressSeeAllClaims,
  onPressSubmitClaim,
  policies,
  title,
}) => {
  const ClaimRows = useMemo(() => {
    if (claims === undefined || policies === undefined) {
      return <ClaimRow />;
    }
    if (claims.length === 0) {
      return (
        <Text
          w="100%"
          textAlign={{
            base: 'center',
            md: 'left',
          }}
          fontSize={{ base: 'md', md: 'lg' }}
        >
          You don&apos;t have any recent claims.
        </Text>
      );
    }
    return claims.map((claim) => (
      <ClaimRow
        key={claim.id}
        claim={claim}
        policy={policies.find((p) => p.id === claim.policy)}
        onClick={onPressClaim}
      />
    ));
  }, [claims, policies, onPressClaim]);

  return (
    <RainwalkCard
      title={{
        text: title,
        _Text: { color: 'rainwalkGray.400' },
      }}
      action={
        hideSeeAllClaimsButton
          ? undefined
          : {
              text: 'See all claims',
              callback: onPressSeeAllClaims,
              _Text: { color: 'rainwalkRustRed.400' },
            }
      }
    >
      <VStack space={5}>{ClaimRows}</VStack>
      {!hideSubmitClaimButton && (
        <Center>
          <Button
            colorScheme="primary"
            mt="6"
            mb="4"
            onPress={onPressSubmitClaim}
          >
            Submit a claim
          </Button>
        </Center>
      )}
    </RainwalkCard>
  );
};

RecentClaimsCard.defaultProps = {
  claims: undefined,
  hideSeeAllClaimsButton: undefined,
  hideSubmitClaimButton: undefined,
  policies: undefined,
};

interface RecentClaimsCardControlledProps
  extends Pick<
    RecentClaimsCardProps,
    'hideSeeAllClaimsButton' | 'hideSubmitClaimButton'
  > {
  limit?: number;
  status?: z.infer<typeof ClaimStatusEnum>;
  title?: string;
}

const RecentClaimsCardControlled: FunctionComponent<
  RecentClaimsCardControlledProps
> = ({ limit, status, title, ...rest }) => {
  const navigation = useNavigation();
  const { logEvent } = useAnalytic();
  const { data: { results: claims } = { results: undefined } } =
    apiHooks.useGet('/insured/claim/search', {
      queries: {
        ...(limit !== undefined && { limit }),
        ...(status !== undefined && { status }),
      },
    });
  const { data: { policies } = { policies: undefined } } =
    apiHooks.useGet('/insured/policy/');

  // HACK(cjshearer): this is the wrong place to filter out invalid data, but
  // we've been asked to do it here for expediency. For the record, this should
  // be done on the backend.
  const validClaims = useMemo(
    () => claims?.filter((claim) => Boolean(claim.claim_number)),
    [claims]
  );

  const onSubmitClaim = () => {
    logEvent('homeSubmitClaimButtonPressed');
    navigation.navigate('BottomTabNavigator', {
      screen: 'ClaimsStack',
      params: {
        initial: false,
        screen: 'SubmitClaim',
      },
    });
  };

  const onClaim = (id: number) => {
    navigation.dispatch({
      ...CommonActions.navigate(
        // This isn't completely safe, since we're not checking if the
        // RecentClaimsCard is actually being rendered in one of these two
        // stacks.
        'ClaimInfoModal' satisfies keyof ClaimsStackParamList &
          keyof HomeStackParamList,
        { id }
      ),
    });
  };

  const onSelectAllClaims = () => {
    navigation.navigate('BottomTabNavigator', {
      screen: 'ClaimsStack',
      params: {
        initial: false,
        screen: 'ViewAllClaims',
      },
    });
  };
  return (
    <RecentClaimsCard
      claims={validClaims}
      policies={policies}
      onPressClaim={onClaim}
      onPressSeeAllClaims={onSelectAllClaims}
      onPressSubmitClaim={onSubmitClaim}
      title={title ?? 'RECENT CLAIMS'}
      {...rest}
    />
  );
};

RecentClaimsCardControlled.defaultProps = {
  limit: undefined,
  status: undefined,
  title: undefined,
};

export { RecentClaimsCard };
export type { RecentClaimsCardProps };
export default RecentClaimsCardControlled;
