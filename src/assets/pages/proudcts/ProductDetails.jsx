import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetails } from '../../../hooks/useProductDetails';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Rating,
  CircularProgress,
  Button,
} from '@mui/material';
import { display } from '@mui/system';
import useAddToCart from '../../../hooks/useAddToCart';
import { useTranslation } from 'react-i18next';

export default function ProductDetails() {
    const { t, i18n } = useTranslation();
  
  const { id } = useParams();
  const { isLoading, isError, data } = useProductDetails(id);
  const {mutate:addToCart,isPending }=useAddToCart();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return <Box sx={{ color: 'red' }}>{t('error_loading_product')}</Box>;
  }

  const product = data.response;
  console.log('Product Details:', product);

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Grid container spacing={2} alignItems="flex-start">
          {/* Image */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                height: 350,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9f9f9',
                borderRadius: 2,
                m: 2,
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Grid>

          {/* Details */}
          <Grid size={{ xs: 12, md: 7 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {product.name || 'No Name'}
              </Typography>

              <Typography variant="h6" color="primary" gutterBottom>
                ${product.price}
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {t('Quantity')}: {product.quantity}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating name="product-rating" value={product.rate || 0} precision={0.5} readOnly />
                <Typography sx={{ ml: 1 }} color="text.secondary">
                  {product.rate || 0} / 5
                </Typography>
              </Box>

              {/* Add to Cart Button */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isPending}
                  onClick={() => addToCart({ productId: product.id, count: 1 })}
                >
                  {isPending ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    t('add_to_cart')
                  )}
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>

        {/* Description */}
        <CardContent>
          {product.description ? (
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}
              >
                {product.description}
              </Typography>
            </Box>
          ) : (
            <Typography color="text.secondary" fontStyle="italic">
              {t('no_description.')}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
