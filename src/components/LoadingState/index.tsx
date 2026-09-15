import { Box, CircularProgress } from '@mui/material';

type LoadingStateProps = {
  minHeight?: number | string;
};

const LoadingState = ({ minHeight = 320 }: LoadingStateProps) => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight={minHeight} width="100%">
    <CircularProgress />
  </Box>
);

export default LoadingState;
