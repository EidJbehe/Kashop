import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useProducts } from '../../../hooks/useProducts';
import { t } from 'i18next';
import Product from "../../components/product/Proudct";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


export default function Products() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: '',
      categoryId: '',
      minPrice: '',
      maxPrice: '',
    },
  });

  const [activeFilter, setActiveFilter] = useState({});
  const { isLoading, isError, data } = useProducts(activeFilter);
  const products = data?.response?.data ?? [];

  const applyFilter = (values) => {
    setActiveFilter({
      search: values.search || null,
      categoryId: values.categoryId || null,
      minPrice: values.minPrice || null,
      maxPrice: values.maxPrice || null,
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Box sx={{ color: 'red' }}>Error loading products.</Box>;
  }

  return (
    <Box p={3} sx={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, maxWidth: 900, mx: 'auto' }}>
        <Button component={Link} to="create" variant="contained">
          Create Product
        </Button>
      </Box>
      {/* Filters */}
      <Card sx={{ maxWidth: 900, mx: 'auto', mb: 4 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Filters
          </Typography>

          <Box component="form" onSubmit={handleSubmit(applyFilter)}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth size="small" label="Search Products" {...register('search')} />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth size="small" label="Category ID" {...register('categoryId')} />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Min Price"
                  type="number"
                  {...register('minPrice')}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Max Price"
                  type="number"
                  {...register('maxPrice')}
                />
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 2 }}>
                <Button type="submit" variant="contained">
                  Apply Filters
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Title */}
      <Typography
        variant="h4"
        fontWeight={600}
        sx={{ color: '#2c2c2c', textAlign: 'center', mb: 4 }}
      >
        {t('Products')}
      </Typography>

      {/* Products */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Grid>
   
    </Box>
  );
}
