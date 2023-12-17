import { Box, extendTheme, Progress } from 'native-base';
import type { FunctionComponent } from 'react';

interface Props {
  max: number;
  value: number;
}

export const RainwalkProgressBar: FunctionComponent<Props> = ({
  value,
  max,
}) => {
  return (
    <Box w="100%">
      <Progress
        style={styles.borderContainer}
        max={max}
        size="lg"
        value={value}
        bg="transparent"
        _filledTrack={styles.filledTrack}
      />
    </Box>
  );
};

const styles = extendTheme({
  filledTrack: { bg: 'rainwalkDeepGreen.400', borderRightRadius: 0 },
  borderContainer: { borderWidth: 0.5, borderColor: 'rainwalkDeepGreen.400' },
});
