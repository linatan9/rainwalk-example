import { UxCamContext } from '@rainwalk/components/UxCamProvider/UxCamContext';
import type { ReactElement } from 'react';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import RNUxcam from 'react-native-ux-cam';

interface Props {
  children: React.ReactNode;
}

export const UxCamProvider = ({ children }: Props): ReactElement => {
  const isIos = Platform.OS === 'ios';
  useEffect(() => {
    if (isIos) {
      RNUxcam.optIntoSchematicRecordings();
    }
    const configuration = {
      userAppKey: 'sk1q5plsgqxlzj4',
      enableAutomaticScreenNameTagging: false,
      enableImprovedScreenCapture: true,
    };
    RNUxcam.startWithConfiguration(configuration);
  }, [isIos]);
  return <UxCamContext.Provider value={null}>{children}</UxCamContext.Provider>;
};
