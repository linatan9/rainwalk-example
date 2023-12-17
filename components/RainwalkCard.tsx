import ExpandLessIcon from '@material-design-icons/svg/filled/expand_less.svg';
import ExpandMoreIcon from '@material-design-icons/svg/filled/expand_more.svg';
import {
  Box,
  Divider,
  HStack,
  type IBoxProps,
  Icon,
  type ITextProps,
  Pressable,
  Spacer,
  Text,
  useBreakpointValue,
  useDisclose,
  VStack,
} from 'native-base';
import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import React from 'react';

interface RainwalkCardProps extends IBoxProps {
  action?: {
    _Text?: ITextProps;
    callback?: () => void;
    text: string;
  };
  boxPX?: Record<string, never> | null;
  boxPY?: Record<string, never> | null;
  expandableChildren?: ReactNode;
  title?: {
    _Text?: ITextProps;
    text: string;
  };
}

const RainwalkCard: FunctionComponent<PropsWithChildren<RainwalkCardProps>> = ({
  action,
  children,
  expandableChildren,
  title,
  boxPX,
  boxPY,
  ...rest
}) => {
  const {
    isOpen: isExpanded,
    onOpen: onExpandMore,
    onClose: onExpandLess,
  } = useDisclose();

  // Shadows are hidden with with overflow:hidden
  // (https://github.com/facebook/react-native/issues/449), so we need a parent
  // view to handle the shadow and a child view to handle hiding the overflow.
  // Since border radius impacts both shadow and overflow, we need to repeat it
  // on each view.
  const borderRadius = '2xl';
  const OpenOrCloseIcon = isExpanded ? ExpandLessIcon : ExpandMoreIcon;
  const expandMoreOrLessIconSizePixels = useBreakpointValue({
    base: 32,
    sm: 42,
  });
  return (
    <Box
      bg="white"
      borderRadius={borderRadius}
      my="2"
      shadow={2}
      w="full"
      {...rest}
    >
      <Box borderRadius={borderRadius} w="full" overflow="hidden">
        <Box
          px={boxPX ?? { base: '5', md: '7' }}
          py={boxPY ?? { base: '5', md: '7' }}
        >
          {Boolean(Boolean(title) || Boolean(action)) && (
            <VStack space="4" mb="4">
              <HStack>
                {Boolean(title) && (
                  <Text
                    color="rainwalkGray.400"
                    fontSize={{
                      base: 'xs',
                      md: 'md',
                      sm: 'sm',
                    }}
                    fontWeight="bold"
                    textTransform="uppercase"
                    {...title?._Text}
                  >
                    {title?.text}
                  </Text>
                )}
                {Boolean(action) && (
                  <>
                    <Spacer />
                    <Pressable key={action?.text} onPress={action?.callback}>
                      <Text
                        fontWeight="bold"
                        fontSize={{
                          base: 'xs',
                          sm: 'sm',
                          md: 'md',
                        }}
                        {...action?._Text}
                      >
                        {action?.text}
                      </Text>
                    </Pressable>
                  </>
                )}
              </HStack>
              <Divider bg="rainwalkGray.400" />
            </VStack>
          )}
          <>{children}</>
          <>{isExpanded ? expandableChildren : null}</>
        </Box>
        {Boolean(expandableChildren) && (
          <Pressable
            alignItems="center"
            backgroundColor="rainwalkGray.50"
            onPress={isExpanded ? onExpandLess : onExpandMore}
            py={5}
          >
            <Text
              color="rainwalkDarkBrown.400"
              fontSize={{ base: 'xs', sm: 'md' }}
              fontWeight="semibold"
              textAlign="center"
            >
              Show {isExpanded ? 'less' : 'more'}
            </Text>
            <Icon
              as={
                <OpenOrCloseIcon
                  width={expandMoreOrLessIconSizePixels}
                  height={expandMoreOrLessIconSizePixels}
                />
              }
              color="rainwalkGray.400"
              fill="currentColor"
              mb={2}
            />
          </Pressable>
        )}
      </Box>
    </Box>
  );
};

RainwalkCard.defaultProps = {
  action: undefined,
  boxPX: null,
  boxPY: null,
  expandableChildren: undefined,
  title: undefined,
};

export type { RainwalkCardProps };
export default RainwalkCard;
