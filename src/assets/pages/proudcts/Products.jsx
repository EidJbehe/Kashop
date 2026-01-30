import React from 'react';
import { useProducts } from '../../../hooks/useProducts';
import { Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { Box, Grid, height } from '@mui/system';
import { Link } from 'react-router-dom';

export default function Proudcts() {
  const { isLoading, isError, data } = useProducts();
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
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        Products
      </Typography>

      <Grid container spacing={3}>
        {data.data.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <Link to={`/Products/${product.id}`} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  transition: '0.3s',
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    height: 220,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      height: '100%',
                      objectFit: 'contain',
                      p: 2,
                    }}
                  />
                </Box>

                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {product.name}
                  </Typography>

                  <Typography variant="subtitle1" color="primary" fontWeight="bold">
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
