import type { Policy } from '@rainwalk/api';
import {
  SelectedPolicyIDContext,
  SelectedPolicyIDUpdateContext,
} from '@rainwalk/contexts/SelectedPolicyID';
import type { ISelectProps } from 'native-base';
import { Select } from 'native-base';
import type { FunctionComponent } from 'react';
import { useContext, useEffect } from 'react';
import type { z } from 'zod';

interface PolicySelectionProps extends ISelectProps {
  hideIfOnlyOnePolicy?: boolean;
  policies?: z.infer<typeof Policy>[];
}

const PolicySelection: FunctionComponent<PolicySelectionProps> = ({
  hideIfOnlyOnePolicy,
  policies,
  ...rest
}) => {
  const selectedPolicyID = useContext(SelectedPolicyIDContext);
  const setSelectedPolicyID = useContext(SelectedPolicyIDUpdateContext);

  useEffect(() => {
    // clear policy selection if the collection is empty, such as occurs on
    // logout
    if (policies === undefined || policies.length === 0) {
      setSelectedPolicyID('');
      return;
    }
    // select the first valid policy if no valid policy is selected
    if (
      policies.find((policy) => policy.id === selectedPolicyID) === undefined
    ) {
      setSelectedPolicyID(policies[0].id);
    }
  }, [policies, selectedPolicyID, setSelectedPolicyID]);

  if ((policies?.length ?? 0) === 0) return null;
  if (hideIfOnlyOnePolicy && policies?.length === 1) return null;
  return (
    <Select
      mb="4"
      borderColor="rainwalkGray.300"
      onValueChange={setSelectedPolicyID}
      selectedValue={selectedPolicyID}
      fontSize="md"
      {...rest}
    >
      {policies?.map((policy) => (
        <Select.Item
          key={policy.id}
          label={policy.quote.pet.pet_name || `${policy.policy_number}`}
          value={policy.id}
        />
      ))}
    </Select>
  );
};

PolicySelection.defaultProps = {
  hideIfOnlyOnePolicy: undefined,
  policies: undefined,
};

export default PolicySelection;
