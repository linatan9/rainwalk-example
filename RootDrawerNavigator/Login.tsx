import { RAINWALK_INSURED_URL, RAINWALK_QUOTING_URL } from '@env';
import Visibility from '@material-design-icons/svg/filled/visibility.svg';
import VisibilityOff from '@material-design-icons/svg/filled/visibility_off.svg';
import { type Api, apiHooks } from '@rainwalk/api';
import RainwalkLogo from '@rainwalk/assets/rainwalk-logo.svg';
import { AuthenticationCredentialsUpdateContext } from '@rainwalk/contexts/AuthenticationCredentials';
import type { ZodiosBodyByPath } from '@zodios/core';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Center,
  Factory,
  FormControl,
  Heading,
  Icon,
  Input,
  Link,
  Pressable,
  Text,
  View,
  VStack,
} from 'native-base';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { useContext, useState } from 'react';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

/**
 * Renders the login form within the login screen.
 */
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isLoading } = apiHooks.usePost('/insured/auth/login');
  const setAuthenticationCredentials = useContext(
    AuthenticationCredentialsUpdateContext
  );
  const { errors, handleChange, handleSubmit, values, setStatus, status } =
    useFormik<ZodiosBodyByPath<Api, 'post', '/insured/auth/login'>>({
      initialValues: {
        email: '',
        password: '',
      },
      initialStatus: '',
      onSubmit: (submittedValues) => {
        mutate(submittedValues, {
          onSuccess: ({ access, refresh }) => {
            setAuthenticationCredentials({
              accessToken: access,
              refreshToken: refresh,
            });
          },
          onError: () => {
            // TODO(cjshearer): handle other errors
            setStatus('No account found with those credentials');
          },
        });
      },
      validate: toFormikValidate(
        z.object({
          email: z.string().email('Incorrect email address'),
          password: z.string().nonempty('Incorrect password'),
        })
      ),
      validateOnChange: false,
    });

  return (
    <VStack space={8} alignItems="center">
      <FormControl
        isDisabled={isLoading}
        isInvalid={'email' in errors || status !== ''}
      >
        <FormControl.Label
          _text={{ color: 'rainwalkDarkBrown.400', fontSize: 'md' }}
          alignSelf="center"
        >
          Email address
        </FormControl.Label>
        <Input
          _input={{
            bgColor: 'white',
            color: 'rainwalkDarkBrown.400',
            fontSize: 'md',
          }}
          onChangeText={handleChange('email')}
          value={values.email}
          variant="valid"
          w="full"
        />
        <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
      </FormControl>
      <FormControl
        isDisabled={isLoading}
        isInvalid={'password' in errors || status !== ''}
      >
        <FormControl.Label
          _text={{ color: 'rainwalkDarkBrown.400', fontSize: 'md' }}
          alignSelf="center"
        >
          Password
        </FormControl.Label>
        <Input
          _input={{
            bgColor: 'white',
            color: 'rainwalkDarkBrown.400',
            fontSize: 'md',
          }}
          InputRightElement={
            <Pressable
              bgColor="white"
              color="currentColor"
              onPress={() => {
                setShowPassword(!showPassword);
              }}
              padding={2}
            >
              <Icon
                as={showPassword ? <VisibilityOff /> : <Visibility />}
                color="rainwalkDarkBrown.400"
                fill="currentColor"
              />
            </Pressable>
          }
          onChangeText={handleChange('password')}
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          variant="valid"
          w="full"
        />
        <FormControl.ErrorMessage>
          {errors.password}
          {status}
        </FormControl.ErrorMessage>
      </FormControl>
      <Button
        mt="2"
        colorScheme="primary"
        onPress={() => {
          handleSubmit();
        }}
        isLoading={isLoading}
      >
        Log in
      </Button>
    </VStack>
  );
};

const NBRainwalkLogo = Factory(RainwalkLogo);

/**
 * Renders the sandy colored background of the Login page with the Rainwalk Logo
 * above any children provided to the page.
 */
export const LoginContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <Center w="full" h="full" bgColor="rainwalkSand.400">
    <Box safeArea p="1" w="full" maxW="325" alignItems="center">
      <NBRainwalkLogo py="24" w="90%" />
      {children}
    </Box>
  </Center>
);

/**
 * Renders the Login screen shown when the user is not logged in
 */
export const Login = () => (
  <View bgColor="rainwalkSand.400">
    <LoginContainer>
      <Heading
        color="rainwalkDarkestBrown.400"
        fontSize="xl"
        fontWeight="medium"
        my={8}
      >
        Log in to your account
      </Heading>
      <LoginForm />
      <Link
        _text={{
          color: 'rainwalkMidnightBlue.400',
          fontSize: 'sm',
          fontWeight: 'medium',
          textAlign: 'center',
        }}
        href={`https://${RAINWALK_INSURED_URL}/forgot-password`}
        isExternal
        isUnderlined={false}
        pt="4"
        w="3/5"
      >
        Forgot your password or don&apos;t have one?
      </Link>
      <Box py="20">
        <Text fontSize="sm" textAlign="center">
          Not a member?
        </Text>
        <Link
          _text={{
            fontSize: 'sm',
            fontWeight: 'medium',
            color: 'rainwalkMidnightBlue.400',
            textAlign: 'center',
          }}
          href={`https://${RAINWALK_QUOTING_URL}`}
          isExternal
          isUnderlined={false}
        >
          Get your quote now
        </Link>
      </Box>
    </LoginContainer>
  </View>
);
