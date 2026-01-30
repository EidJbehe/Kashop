import React from 'react';
import useCart from './../../../hooks/useCart';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import useRemoveFromCare from '../../../hooks/useRemoveFromCart';
import useUpdateCount from '../../../hooks/useUpdateCartItem';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTranslation } from 'react-i18next';
export default function Cart() {
    const { t, i18n } = useTranslation();
  
  const { data, isLoading, isError, refetch } = useCart();
  const { mutate: deleteFromCart, isPending } = useRemoveFromCare();
  const { mutate: updateCount, isPending: isPendingUpdate } = useUpdateCount();
  const handleUpdateCount = (productId, action) => {
    const currentItem = data.items.find((item) => item.productId === productId);
    if (action == '+') {
      updateCount({ productId, count: currentItem.count + 1 });
    } else if (action == '-') {
      if (currentItem.count > 1) {
        updateCount({ productId, count: currentItem.count - 1 });
      }
    }
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
              {[t('Name'), t('Price'), t('Quantity'), t('Total'), t('Actions')].map((header) => (
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
                  '&:hover': { bgcolor: '#f1f8e9', transform: 'scale(1.01)', transition: '0.2s' },
                }}
              >
                <TableCell sx={{ textAlign: 'center', fontWeight: 500 }}>
                  {item.productName}
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 500 }}>
                  ${item.price.toFixed(2)}
                </TableCell>

                <TableCell sx={{ textAlign: 'center', fontWeight: 500 }}>
                  <Button size="small" onClick={() => handleUpdateCount(item.productId, '-')}>
                    <RemoveIcon fontSize="small" />
                  </Button>

                  {item.count}
                  <Button size="small" onClick={() => handleUpdateCount(item.productId, '+')}>
                    <AddIcon fontSize="small" />
                  </Button>
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 500 }}>
                  ${item.totalPrice.toFixed(2)}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 'bold',
                      ':hover': { bgcolor: '#c62828', transform: 'scale(1.05)' },
                    }}
                    onClick={() => deleteFromCart(item.productId)}
                    disabled={isPending}
                  >
                    {isPending ? <CircularProgress size={24} sx={{ color: 'white' }} /> : t('Remove')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {data?.items?.length > 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  sx={{ fontWeight: 'bold', textAlign: 'right', fontSize: 16 }}
                >
                  {t('cart_toral')}:
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
      </TableContainer>
    </Box>
  );
}
