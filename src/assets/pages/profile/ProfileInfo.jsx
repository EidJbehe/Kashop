import React from 'react';
import useProfile from '../../../hooks/useProfile';
import { Box, Card, CardContent, Typography, Divider, CircularProgress } from '@mui/material';
import { t } from 'i18next';
import { textAlign } from '@mui/system';

export default function ProfileInfo() {
  const { data, isError, isLoading } = useProfile();
  console.log(data);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={50} thickness={4} />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box
        sx={{
          color: 'red',
          textAlign: 'center',
          mt: 10,
          fontWeight: 'bold',
          fontSize: 18,
        }}
      >
        {t('loading_profile_error')}
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mt: 2 }}>
        Profile Info
      </Typography>

      <Card variant="outlined" sx={{ maxWidth: 500, mb: 3, mx: 'auto' }}>
        <CardContent>
          {/* Full Name */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Full Name
            </Typography>
            <Typography variant="body1">{data.fullName}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />

          {/* Email */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1">{data.email}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />

          {/* Phone */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Phone
            </Typography>
            <Typography variant="body1">{data.phoneNumber}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />

          {/* City */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              City
            </Typography>
            <Typography variant="body1">{data.city || 'Not specified'}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
