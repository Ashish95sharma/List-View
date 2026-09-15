import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ROUTES from '@routes/routes';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" p={4}>
      <Typography variant="h3" fontWeight={700} mb={1}>
        404
      </Typography>
      <Typography mb={2}>Page not found</Typography>
      <Button variant="contained" onClick={() => navigate(ROUTES.BASE_ROUTE)}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
