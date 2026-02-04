import React from 'react';
import { useProducts } from '../../../hooks/useProducts';
import { Button, Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { Box, Grid, height, textAlign } from '@mui/system';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Product from "../../components/product/Proudct";

export default function ProudctsSection() {
  const { t, i18n } = useTranslation();

  const { isLoading, isError, data } = useProducts();
  const products = data?.response?.data ?? [];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (isError) {
    return <Box sx={{ color: 'red' }}>Error loading categories.</Box>;
  }
  return (
    <Box p={3} sx={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        mb={4}
        fontWeight={600}
        sx={{ color: '#2c2c2c', textAlign: 'center', mb: 4 }}
      >
        {t('Products')}
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" component={Link} to="/Products">
          Show All Products
        </Button>
      </Box>
    </Box>
  );
}
