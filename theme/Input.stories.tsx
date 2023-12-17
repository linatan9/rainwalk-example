import { HStack, Input, VStack } from 'native-base';

export default {
  render: () => (
    <VStack space={2} justifyContent="center" h="full">
      <HStack space={2}>
        <Input placeholder="normal placeholder" flex={1} />
        <Input value="normal value" flex={1} />
      </HStack>
      <HStack space={2}>
        <Input placeholder="readonly placeholder" isReadOnly flex={1} />
        <Input value="readonly value" isReadOnly flex={1} />
      </HStack>
      <HStack space={2}>
        <Input placeholder="disabled placeholder" isDisabled flex={1} />
        <Input value="disabled value" isDisabled flex={1} />
      </HStack>
      <HStack space={1}>
        <Input placeholder="valid placeholder" variant="valid" flex={1} />
        <Input value="valid value" variant="valid" flex={1} />
      </HStack>
      <HStack space={2}>
        <Input placeholder="invalid placeholder" isInvalid flex={1} />
        <Input value="invalid value" isInvalid flex={1} />
      </HStack>
    </VStack>
  ),
};

export const All = {};
