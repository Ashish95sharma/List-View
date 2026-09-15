import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import type { Category } from '@/types/product.types';

export const ALL_CATEGORIES_VALUE = 'all';

export type ProductFiltersValue = {
  category: string;
  brands: string[];
  minPrice: string;
  maxPrice: string;
};

type ProductFiltersProps = {
  value: ProductFiltersValue;
  categories: Category[];
  brands: string[];
  onChange: (value: ProductFiltersValue) => void;
};

const ProductFilters = ({ value, categories, brands, onChange }: ProductFiltersProps) => {
  const [minPrice, setMinPrice] = useState(value.minPrice);
  const [maxPrice, setMaxPrice] = useState(value.maxPrice);

  useEffect(() => {
    setMinPrice(value.minPrice);
    setMaxPrice(value.maxPrice);
  }, [value.minPrice, value.maxPrice]);

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'grey.100',
        borderRight: '1px solid',
        borderColor: 'grey.300',
        p: 2,
        height: '100%',
        overflowY: 'auto'
      }}
    >
      <Typography variant="subtitle2" fontWeight={700} mb={1}>
        Categories
      </Typography>
      <RadioGroup
        value={value.category}
        onChange={(e) => onChange({ ...value, category: e.target.value })}
        sx={{ mb: 2.5 }}
      >
        <FormControlLabel
          value={ALL_CATEGORIES_VALUE}
          control={<Radio size="small" />}
          label={<Typography variant="body2">All Categories</Typography>}
        />
        {categories.slice(0, 6).map((category) => (
          <FormControlLabel
            key={category.slug}
            value={category.slug}
            control={<Radio size="small" />}
            label={<Typography variant="body2">{category.name}</Typography>}
          />
        ))}
      </RadioGroup>

      <Typography variant="subtitle2" fontWeight={700} mb={1}>
        Price Range
      </Typography>
      <Stack direction="row" spacing={1} mb={1}>
        <TextField
          size="small"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          inputProps={{ inputMode: 'decimal' }}
          sx={{ bgcolor: 'common.white' }}
        />
        <TextField
          size="small"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          inputProps={{ inputMode: 'decimal' }}
          sx={{ bgcolor: 'common.white' }}
        />
      </Stack>
      <Button
        variant="contained"
        size="small"
        fullWidth
        sx={{ mb: 2.5 }}
        onClick={() => onChange({ ...value, minPrice, maxPrice })}
      >
        Apply
      </Button>

      <Typography variant="subtitle2" fontWeight={700} mb={1}>
        Brands
      </Typography>
      <FormGroup>
        {brands.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No brands in the current results
          </Typography>
        ) : (
          brands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  size="small"
                  checked={value.brands.includes(brand)}
                  onChange={() =>
                    onChange({
                      ...value,
                      brands: value.brands.includes(brand)
                        ? value.brands.filter((b) => b !== brand)
                        : [...value.brands, brand]
                    })
                  }
                />
              }
              label={<Typography variant="body2">{brand}</Typography>}
            />
          ))
        )}
      </FormGroup>
    </Box>
  );
};

export default ProductFilters;
