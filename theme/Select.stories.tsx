import { HStack, Select, VStack } from 'native-base';

export default {
  render: () => (
    <VStack space={2} justifyContent="center" h="full">
      <HStack space={2}>
        <Select placeholder="normal placeholder" flex={1}>
          <Select.Item key="1" label="item 1" value="1" />
          <Select.Item key="2" label="item 2" value="2" />
          <Select.Item key="3" label="item 3" value="3" />
        </Select>
        <Select defaultValue="1" flex={1}>
          <Select.Item key="1" label="item 1" value="1" />
          <Select.Item key="2" label="item 2" value="2" />
          <Select.Item key="3" label="item 3" value="3" />
        </Select>
      </HStack>
      <HStack space={2}>
        <Select placeholder="disabled placeholder" isDisabled flex={1}>
          <Select.Item key="1" label="item 1" value="1" />
          <Select.Item key="2" label="item 2" value="2" />
          <Select.Item key="3" label="item 3" value="3" />
        </Select>
        <Select defaultValue="1" isDisabled flex={1}>
          <Select.Item key="1" label="item 1" value="1" />
          <Select.Item key="2" label="item 2" value="2" />
          <Select.Item key="3" label="item 3" value="3" />
        </Select>
      </HStack>
      <HStack space={2}>
        <Select placeholder="disabled placeholder" flex={1}>
          <Select.Item key="1" label="item 1" value="1" />
          <Select.Item key="2" label="item 2" value="2" />
          <Select.Item key="3" label="item 3" value="3" />
        </Select>
        <Select defaultValue="1" flex={1}>
          <Select.Item key="1" label="item 1" value="1" />
          <Select.Item key="2" label="item 2" value="2" />
          <Select.Item key="3" label="item 3" value="3" />
        </Select>
      </HStack>
    </VStack>
  ),
};

export const All = {};
