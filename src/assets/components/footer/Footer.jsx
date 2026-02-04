import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#5573734d',
        color: '#000000',
        mt: 10,
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Knowledge Shop
            </Typography>
            <Typography variant="body2" color="gray">
              Your trusted online store for quality products, easy shopping, and secure checkout.
            </Typography>
          </Grid>

          {/* Links */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography fontWeight="bold" gutterBottom>
              {t('Quick Links')}
            </Typography>
            {['Home', 'Products', 'Cart', 'Checkout'].map((item) => (
              <Typography key={item} variant="body2">
                <Link
                  href="#"
                  underline="none"
                  color="inherit"
                  sx={{ '&:hover': { color: '#38bdf8' } }}
                >
                  {t(item)}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Support */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography fontWeight="bold" gutterBottom>
              {t('Support')}
            </Typography>
            {['Contact Us', 'FAQ', 'Privacy Policy'].map((item) => (
              <Typography key={item} variant="body2">
                <Link
                  href="#"
                  underline="none"
                  color="inherit"
                  sx={{ '&:hover': { color: '#38bdf8' } }}
                >
                  {t(item)}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Contact */}
          <Grid v>
            <Typography fontWeight="bold" gutterBottom>
              {t('Contact')}
            </Typography>
            <Typography variant="body2">📧 support@knowledgeshop.com</Typography>
            <Typography variant="body2">📞 +970 592 115024</Typography>
            <Typography variant="body2">📍 Palestine</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: '#334155', my: 4 }} />

        {/* Copyright */}
        <Typography variant="body2" align="center" color="gray">
          © {new Date().getFullYear()} Knowledge Shop. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
