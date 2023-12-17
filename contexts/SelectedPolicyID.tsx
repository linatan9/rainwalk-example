import type {
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import { createContext, useState } from 'react';

export const SelectedPolicyIDContext = createContext('');
export const SelectedPolicyIDUpdateContext = createContext<
  Dispatch<SetStateAction<string>>
>(() => {});

const SelectPolicyProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [selectedPolicyID, setSelectedPolicyID] = useState('');
  return (
    <SelectedPolicyIDUpdateContext.Provider value={setSelectedPolicyID}>
      <SelectedPolicyIDContext.Provider value={selectedPolicyID}>
        {children}
      </SelectedPolicyIDContext.Provider>
    </SelectedPolicyIDUpdateContext.Provider>
  );
};

export default SelectPolicyProvider;
