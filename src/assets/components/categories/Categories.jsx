import { Box, Card, CardContent, CircularProgress, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../Api/axiosInstance.js';
import { useCategories } from '../../../hooks/useCategories.js';
import { useTranslation } from 'react-i18next';

export default function Categories() {
  const { isLoading, isError, data } = useCategories();
   const { t, i18n } = useTranslation();
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (isError) {
    return <Box sx={{ color: 'red' }}>{t('error_loading_categories')}</Box>;
  }

 return (
  <Box
    sx={{
      minHeight: "80vh",
      py: { xs: 6, md: 10 },
      px: { xs: 2, md: 6 },
      background: "linear-gradient(180deg, #f9fafb 0%, #f1f5f9 100%)",
    }}
  >
    {/* Title */}
    <Typography
      sx={{
        fontSize: { xs: "26px", md: "34px" },
        fontWeight: 800,
        color: "#0f172a",
        letterSpacing: "-0.5px",
        mb: 8,
        textAlign: "center",
      }}
    >
      {t("Categories")}
    </Typography>

    <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
      {data.response.map((category) => (
        <Grid
          key={category.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 290,
              borderRadius: 4,
              cursor: "pointer",
              textAlign: "center",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(6px)",
              border: "1px solid #e5e7eb",
              transition: "all 0.35s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 18px 30px rgba(0,0,0,0.08)",
                borderColor: "#c7d2fe",
              },
              "&:active": {
                transform: "translateY(-3px)",
              },
            }}
          >
            <CardContent sx={{ py: 6, px: 3 }}>
              {/* Icon Circle */}
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  mx: "auto",
                  mb: 3,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #e0f2fe 0%, #ede9fe 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  color: "#4338ca",
                  transition: "all 0.35s ease",
                  boxShadow: "0 6px 12px rgba(99,102,241,0.2)",
                  "&:hover": {
                    transform: "scale(1.15) rotate(5deg)",
                  },
                }}
              >
                📦
              </Box>

              {/* Category Name */}
              <Typography
                sx={{
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#1e293b",
                  lineHeight: 1.5,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={category.name}
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