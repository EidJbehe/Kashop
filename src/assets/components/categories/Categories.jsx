import { Box, Card, CardContent, CircularProgress, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../Api/axiosInstance.js';
import { useCategories } from '../../../hooks/useCategories.js';

export default function Categories() {
  const { isLoading, isError, data } = useCategories();
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
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
        py: 6,
      }}
    >
      <Typography
        sx={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#000',
          letterSpacing: '-0.3px',
          mb: 3,
        }}
      >
        Categories
      </Typography>

      <Grid container spacing={3}>
        {data.map((category) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={category.id}>
            <Card
              elevation={0}
              onClick={() => {
              }}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 3,
                border: '1px solid #eee',
                cursor: 'pointer',
                transition: 'all 0.2s ease',

                '&:hover': {
                  borderColor: '#ccc',
                  transform: 'translateY(-2px)',
                },

                '&:active': {
                  transform: 'translateY(0)',
                  backgroundColor: '#fafafa',
                },
              }}
            >
              <CardContent
                sx={{
                  py: 3,
                  px: 2.5,
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#000',
                    letterSpacing: '0.2px',
                  }}
                >
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
