import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HistoryIcon from '@mui/icons-material/History';
import StarIcon from '@mui/icons-material/Star';
import { t } from 'i18next';

export default function About() {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h3" textAlign="center" fontWeight={700} mb={4}>
        {t('About')}
      </Typography>

      <Typography variant="body1" textAlign="center" mb={6} sx={{ maxWidth: 700, mx: 'auto' }}>
        Welcome to KnowledgeShop! We are committed to providing the best products with top-notch
        customer service. Our mission is to bring quality items to your doorstep quickly and safely.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid size={{xs:12,sm:4} } >
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <InfoIcon sx={{ fontSize: 50, color: '#1976d2', mb: 2 }} />
            <CardContent>
              <Typography variant="h6" fontWeight={600}>
                Our Mission
              </Typography>
              <Typography variant="body2">
                Deliver high-quality products with excellent service.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12,sm:4} } >
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <HistoryIcon sx={{ fontSize: 50, color: '#1976d2', mb: 2 }} />
            <CardContent>
              <Typography variant="h6" fontWeight={600}>
                Our History
              </Typography>
              <Typography variant="body2">
                Serving customers since 2020 with a growing reputation.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12,sm:4} } >
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <StarIcon sx={{ fontSize: 50, color: '#1976d2', mb: 2 }} />
            <CardContent>
              <Typography variant="h6" fontWeight={600}>
                Our Values
              </Typography>
              <Typography variant="body2">
                Trust, quality, and customer satisfaction above all.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
