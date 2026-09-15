import { Box, Typography } from '@mui/material';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';

type EmptyStateProps = {
  title?: string;
  description?: string;
};

const EmptyState = ({
  title = 'No products found',
  description = 'Try adjusting your filters or search to find what you need.'
}: EmptyStateProps) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    py={8}
    px={2}
  >
    <SearchOffOutlinedIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1.5 }} />
    <Typography variant="h6" fontWeight={600} mb={0.5}>
      {title}
    </Typography>
    <Typography color="text.secondary" maxWidth={360}>
      {description}
    </Typography>
  </Box>
);

export default EmptyState;
