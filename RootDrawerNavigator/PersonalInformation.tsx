import { apiHooks } from '@rainwalk/api';
import type { RootDrawerScreenProps } from '@rainwalk/RootDrawerNavigator';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import { Box, Divider, Text } from 'native-base';
import type { FunctionComponent } from 'react';

const PersonalInformation: FunctionComponent<
  RootDrawerScreenProps<'PersonalInformation'>
> = () => {
  const {
    data: { user: { email, phone_number: phoneNumber } } = {
      user: { email: '', phone_number: '' },
    },
  } = apiHooks.useGet('/insured/profile');

  return (
    <ScreenLayout
      hideSettingsButton
      hideTopBarOverflow
      title="Personal Information"
    >
      {(
        [
          ['EMAIL ADDRESS', email],
          ['PHONE', phoneNumber ?? ''],
        ] satisfies string[][]
      ).map(([label, value], informationIndex) => (
        // TODO(cjshearer): extract this into a component that can be reused
        // with other settings options, such as in the notifications screen
        <Box key={label}>
          <Text
            color="rainwalkGray.300"
            fontSize={{ base: 'xs', sm: 'md' }}
            fontWeight={{ base: 'medium', sm: 'semibold' }}
            mb={{ base: 2, sm: 3 }}
            mt={informationIndex === 0 ? 9 : 0}
          >
            {label}
          </Text>
          <Text
            color="rainwalkDarkBrown.400"
            fontSize={{ base: 'xs', sm: 'md' }}
            fontWeight={{ base: 'medium', sm: 'semibold' }}
            mb={{ base: 5, sm: 8 }}
          >
            {value}
          </Text>
          <Divider bg="rainwalkGray.400" mb={{ base: 6, sm: 8 }} />
        </Box>
      ))}
    </ScreenLayout>
  );
};

export default PersonalInformation;
