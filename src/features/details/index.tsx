import { Box, Button, Rating } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmptyState from '@components/EmptyState';
import ErrorState from '@components/ErrorState';
import Header from '@components/Header';
import LoadingState from '@components/LoadingState';
import Pagination from '@components/Pagination';
import { formatPrice } from '@utils/product.utils';
import { useDetailsHelper } from './details.helper';
import './details.scss';

const Details = () => {
  const {
    productId,
    product,
    images,
    imagePage,
    currentImage,
    finalPrice,
    categoryLabel,
    brandLabel,
    reviews,
    headerSearch,
    isLoading,
    isFetching,
    isError,
    isNotFound,
    showProduct,
    errorMessage,
    handleHeaderSearchChange,
    handleBack,
    handleImagePageChange,
    handleRetry
  } = useDetailsHelper();

  return (
    <div className="details-wrapper">
      <Header search={headerSearch} onSearchChange={handleHeaderSearchChange} />

      <div className="content">
        <div className="card">
          <div className="back">
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              sx={{
                borderColor: 'grey.400',
                bgcolor: 'common.white',
                textTransform: 'none',
                px: 2
              }}
            >
              Back
            </Button>
          </div>

          {!productId && (
            <EmptyState
              title="Missing product id"
              description="Select a product from the listing."
            />
          )}

          {productId && (isLoading || isFetching) && <LoadingState />}

          {productId && isError && (
            <ErrorState message={errorMessage} onRetry={handleRetry} />
          )}

          {isNotFound && (
            <EmptyState
              title="Product not found"
              description="This product may have been removed."
            />
          )}

          {showProduct && product && (
            <div className="layout">
              <div>
                <div className="media">
                  <img src={currentImage} alt={product.title} />
                </div>
                {images.length > 1 && (
                  <div className="gallery">
                    <Pagination
                      page={imagePage}
                      totalPages={images.length}
                      onChange={handleImagePageChange}
                    />
                  </div>
                )}
              </div>

              <div className="info">
                <h1 className="title">{product.title}</h1>

                <div className="meta-row">
                  <p className="price">{formatPrice(finalPrice)}</p>
                  <div className="rating">
                    <Rating
                      value={product.rating}
                      precision={0.1}
                      readOnly
                      sx={{ color: '#f5b400' }}
                    />
                    <span>({product.rating.toFixed(1)})</span>
                  </div>
                </div>

                <div className="attrs">
                  <TypographyLine label="Brand" value={brandLabel} />
                  <TypographyLine label="Category" value={categoryLabel} />
                </div>

                <hr className="divider" />

                <h2 className="section-title">Description</h2>
                <p className="description">{product.description}</p>

                {!!reviews.length && (
                  <>
                    <hr className="divider" />
                    <h2 className="section-title">Reviews</h2>
                    <div className="reviews">
                      {reviews.map((review, index) => (
                        <div key={`${review.reviewerEmail}-${index}`} className="review">
                          <p className="review-name">{review.reviewerName}</p>
                          <div className="review-rating">
                            <Rating
                              value={review.rating}
                              readOnly
                              size="small"
                              sx={{ color: '#f5b400' }}
                            />
                            <span>({review.rating.toFixed(1)})</span>
                          </div>
                          <p className="review-comment">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TypographyLine = ({ label, value }: { label: string; value: string }) => (
  <Box component="p" m={0}>
    <strong>{label}:</strong> {value}
  </Box>
);

export default Details;
