import React, { useState } from 'react';
import useCart from '../../../hooks/useCart';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import useChekout from '../../../hooks/useChekout';


export default function Chekout() {
  const { t, i18n } = useTranslation();
    const { data, isLoading, isError, refetch } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const { mutate: ChekoutMutation, isPending: isPendingChekout } = useChekout();
    const handlePaymentMethod = (event) => {
        console.log(event.target.value);
      setPaymentMethod(event.target.value);
    };
  const handleChekout = () => {
      ChekoutMutation(paymentMethod, {
          onSuccess: (response) => {
              console.log('Response data:', response);
          const url = response.data?.url; 
          console.log('Checkout successful:', url);
          if (url) {
            window.location.href = url;  
          } else {
            alert(response.data?.message || 'Checkout failed');
          }
        },
      });
  };
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
        {t('loading_cart_error')}
      </Box>
    );
  }

  return (
    <Box component="section" sx={{ p: 4, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          mb: 4,
          color: '#4a6572',
        }}
      >
        {t('shopping_cart')}
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 900,
          margin: 'auto',
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: '#e0f7fa' }}>
            <TableRow>
              {[t('Name'), t('Price'), t('Quantity'), t('Total')].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: '#006064',
                    fontWeight: 'bold',
                    fontSize: 16,
                    textAlign: 'center',
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.items?.map((item) => (
              <TableRow
                key={item.productId}
                sx={{
                  '&:hover': {
                    bgcolor: '#f1f8e9',
                    transform: 'scale(1.01)',
                    transition: '0.2s',
                  },
                }}
              >
                <TableCell sx={{ textAlign: 'center', fontWeight: 500 }}>
                  {item.productName}
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 500 }}>
                  ${item.price.toFixed(2)}
                </TableCell>

                <TableCell sx={{ textAlign: 'center', fontWeight: 500 }}>{item.count}</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 500 }}>
                  ${item.totalPrice.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}

            {data?.items?.length > 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  sx={{ fontWeight: 'bold', textAlign: 'right', fontSize: 16 }}
                >
                  {t('cart_total')}:
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>
                  ${data.cartTotal.toFixed(2)}
                </TableCell>
                <TableCell />
              </TableRow>
            )}

            {!data?.items?.length && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ fontWeight: 'bold', p: 4 }}>
                  {t('Empty_Cart')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <FormControl fullWidth sx={{ m: 4, maxWidth: 300 }}>
          <InputLabel>Payment Method</InputLabel>
          <Select onChange={handlePaymentMethod} value={paymentMethod} label="Payment Method">
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Visa">Visa</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={handleChekout}
            disabled={isPendingChekout}
          sx={{ m: 4 }}
          variant="contained"
          color="primary"
        >
          {isPendingChekout ? 'Redirecting...' : t('pay_now')}
        </Button>
      </TableContainer>
    </Box>
  );
}
