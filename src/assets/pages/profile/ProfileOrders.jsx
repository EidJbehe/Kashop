import React from 'react';
import useProfile from '../../../hooks/useProfile';
import { CircularProgress, Typography, Box, Card, CardContent, Divider } from '@mui/material';
import { t } from 'i18next';

export default function ProfileOrders() {
  const { data, isError, isLoading } = useProfile();

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

  if (!data.orders || data.orders.length === 0) {
    return <Typography sx={{ mt: 5, textAlign: 'center' }}>{t('no_orders_found')}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Orders ({data.orders.length})
      </Typography>

      {data.orders.map((order, index) => (
        <Card variant="outlined" sx={{ mb: 3 }} key={order.id || index}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Order #{index + 1}
            </Typography>
            <Divider sx={{ mb: 1 }} />

            <Typography variant="body1">
              <strong>ID:</strong> {order.id}
            </Typography>
            <Typography variant="body1">
              <strong>Amount Paid:</strong> ${order.amountPaid}
            </Typography>
            <Typography variant="body1">
              <strong>Payment Status:</strong> {order.paymentStatus}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {order.status}
            </Typography>
            <Typography variant="body1">
              <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
