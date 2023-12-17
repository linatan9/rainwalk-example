import { captureException } from '@rainwalk/logging';
import type {
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import { createContext, useEffect, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

const credentialKeys = ['accessToken', 'refreshToken'] as const;

export type AuthenticationCredentials = {
  [key in (typeof credentialKeys)[number]]?: string;
};

export type AuthenticationCredentialsUpdate = Dispatch<
  SetStateAction<AuthenticationCredentials>
>;

export const AuthenticationCredentialsContext =
  createContext<AuthenticationCredentials>(
    {} satisfies AuthenticationCredentials
  );
export const AuthenticationCredentialsUpdateContext =
  createContext<AuthenticationCredentialsUpdate>(() => {});

const AuthenticationCredentialsProvider: FunctionComponent<
  PropsWithChildren
> = ({ children }) => {
  const [authenticationCredentials, setAuthenticationCredentials] =
    useState<AuthenticationCredentials>({});

  useEffect(() => {
    const hydrateAuthenticationCredentials = async () => {
      setAuthenticationCredentials(
        Object.fromEntries(
          (await Promise.all(
            credentialKeys.map(async (key) => [
              key,
              (await EncryptedStorage.getItem(key)) ?? '',
            ])
          )) satisfies Entries<AuthenticationCredentials>
        )
      );
    };
    hydrateAuthenticationCredentials().catch(captureException);
  }, [setAuthenticationCredentials]);

  useEffect(() => {
    Object.entries(authenticationCredentials).forEach(([key, value]) => {
      EncryptedStorage.setItem(key, value).catch(captureException);
    });
  }, [authenticationCredentials]);

  return (
    <AuthenticationCredentialsUpdateContext.Provider
      value={setAuthenticationCredentials}
    >
      <AuthenticationCredentialsContext.Provider
        value={authenticationCredentials}
      >
        {children}
      </AuthenticationCredentialsContext.Provider>
    </AuthenticationCredentialsUpdateContext.Provider>
  );
};

export default AuthenticationCredentialsProvider;
