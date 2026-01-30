import React from 'react';
import { useProducts } from '../../../hooks/useProducts';
import { Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { Box, Grid, height } from '@mui/system';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Proudcts() {
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
  <Box p={3} sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
    <Typography
      variant="h4"
      mb={4}
      fontWeight={600}
      sx={{ color: "#2c2c2c", textAlign: 'center', mb: 4 }}
    >
      {t("Products")}
    </Typography>

    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          key={product.id}
        >
          <Link
            to={`/Products/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                height: "100%",
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "#ffffff",
                border: "1px solid #ededed",
                transition: "all 0.3s ease",
                boxShadow: "none",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
                },
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  width: "100%",
                  height: 230,
                  backgroundColor: "#f3f3f3",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              {/* Content */}
              <CardContent sx={{ p: 2.5 }}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#2f2f2f",
                    mb: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#6b6b6b",
                  }}
                >
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