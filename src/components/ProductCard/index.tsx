import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types/product.types';
import { getProductDetailPath } from '@routes/routes';
import { formatPrice, getDiscountedPrice } from '@utils/product.utils';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const discounted = (product.discountPercentage ?? 0) > 0;
  const price = getDiscountedPrice(product);

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.2s ease',
        '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }
      }}
    >
      <CardActionArea
        onClick={() => navigate(getProductDetailPath(product.id))}
        sx={{ height: '100%', alignItems: 'stretch', display: 'flex', flexDirection: 'column' }}
      >
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'grey.50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 180,
            p: 2
          }}
        >
          {discounted && (
            <Chip
              label={`-${Math.round(product.discountPercentage!)}%`}
              size="small"
              color="error"
              sx={{ position: 'absolute', top: 10, left: 10, fontWeight: 700, zIndex: 1 }}
            />
          )}
          <CardMedia
            component="img"
            image={product.thumbnail}
            alt={product.title}
            sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </Box>
        <CardContent sx={{ width: '100%', pt: 1.5, pb: 2, px: 2 }}>
          <Typography variant="subtitle1" fontWeight={700} noWrap title={product.title}>
            {product.title}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
            gap={1}
            flexWrap="nowrap"
          >
            <Stack direction="row" alignItems="baseline" spacing={0.75}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ flexShrink: 0 }}>
                {formatPrice(price)}
              </Typography>
              {discounted && (
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  {formatPrice(product.price)}
                </Typography>
              )}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5} minWidth={0}>
              <Rating
                value={product.rating}
                precision={0.1}
                readOnly
                size="small"
                sx={{ color: '#f5b400', '& .MuiRating-icon': { fontSize: '1rem' } }}
              />
              <Typography variant="body2" color="text.secondary" noWrap>
                ({product.rating.toFixed(1)})
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
