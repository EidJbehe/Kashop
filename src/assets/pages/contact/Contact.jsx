import React from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import { t } from 'i18next';

export default function Contact() {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Typography variant="h3" textAlign="center" fontWeight={700} mb={4}>
        {t('Contact') }
      </Typography>

      <Grid container spacing={6} justifyContent="center">
        {/* Contact Info */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" mb={2}>
            Get in Touch
          </Typography>
          <Typography mb={1}>Email: support@knowledgeshop.com</Typography>
          <Typography mb={1}>Phone: +1 234 567 890</Typography>
          <Typography mb={1}>Address: 123 Knowledge St., Tech City</Typography>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={5}>
          <Box component="form">
            <TextField fullWidth label="Name" size="small" sx={{ mb: 2 }} />
            <TextField fullWidth label="Email" size="small" sx={{ mb: 2 }} />
            <TextField fullWidth label="Message" multiline rows={4} size="small" sx={{ mb: 2 }} />
            <Button variant="contained" fullWidth>
              Send Message
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
