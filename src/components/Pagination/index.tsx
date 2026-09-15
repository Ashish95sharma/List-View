import { Button, Stack } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const navSx = {
  borderColor: 'grey.400',
  color: 'text.primary',
  bgcolor: 'common.white',
  px: 1.5
} as const;

const getVisiblePages = (page: number, totalPages: number) => {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, 4, 5];
  if (page >= totalPages - 2) {
    return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [page - 2, page - 1, page, page + 1, page + 2];
};

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} flexWrap="wrap" useFlexGap>
      <Button
        variant="outlined"
        color="inherit"
        disabled={page <= 1}
        startIcon={<ChevronLeftIcon />}
        onClick={() => onChange(page - 1)}
        sx={navSx}
      >
        Previous
      </Button>

      {getVisiblePages(page, totalPages).map((n) => {
        const active = n === page;
        return (
          <Button
            key={n}
            variant={active ? 'contained' : 'outlined'}
            onClick={() => onChange(n)}
            sx={{
              minWidth: 40,
              px: 1.25,
              borderColor: 'grey.400',
              color: active ? 'common.white' : 'text.primary',
              bgcolor: active ? 'primary.main' : 'common.white',
              '&:hover': {
                bgcolor: active ? 'primary.dark' : 'grey.50',
                borderColor: 'grey.400'
              }
            }}
          >
            {n}
          </Button>
        );
      })}

      <Button
        variant="outlined"
        color="inherit"
        disabled={page >= totalPages}
        endIcon={<ChevronRightIcon />}
        onClick={() => onChange(page + 1)}
        sx={navSx}
      >
        Next
      </Button>
    </Stack>
  );
};

export default Pagination;
