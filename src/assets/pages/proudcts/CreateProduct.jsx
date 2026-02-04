import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/useCreateProduct';
import { useCategories } from '../../../hooks/useCategories';

export default function CreateProduct() {
  const navigate = useNavigate();
  const { createProductMutation, serverErrors } = useCreateProduct();
  const [mainImage, setMainImage] = useState(null);

 
  const { isLoading: isCategoriesLoading, isError: isCategoriesError, data } = useCategories();
    const categories = data?.response?? [];
  

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      nameEn: '',
      descriptionEn: '',
      nameAr: '',
      descriptionAr: '',
      price: '',
      discount: '',
      quantity: '',
      categoryId: '',
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    // Translations
    formData.append('Translations[0].language', 'en');
    formData.append('Translations[0].name', data.nameEn);
    formData.append('Translations[0].Description', data.descriptionEn);

    formData.append('Translations[1].language', 'ar');
    formData.append('Translations[1].name', data.nameAr);
    formData.append('Translations[1].Description', data.descriptionAr);

    // Fields
    formData.append('Price', data.price);
    formData.append('Discount', data.discount || 0);
    formData.append('Quantity', data.quantity);
    formData.append('CategoryId', data.categoryId);

    // Main Image
    if (mainImage) {
      formData.append('MainImage', mainImage);
    }

    createProductMutation.mutate(formData, {
      onSuccess: () => {
        reset();
        setMainImage(null);
        navigate('/Products');
      },
    });
  };

  if (isCategoriesLoading) return <Typography>Loading categories...</Typography>;
  if (isCategoriesError) return <Typography color="error">Error loading categories</Typography>;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f7f7f7', py: 4 }}>
      <Card sx={{ maxWidth: 900, mx: 'auto', px: 2, py: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight={700} mb={3} textAlign="center">
            Create New Product
          </Typography>

          {serverErrors.length > 0 && (
            <Box sx={{ color: 'red', mb: 2 }}>
              {serverErrors.map((err, index) => (
                <Typography key={index}>{err}</Typography>
              ))}
            </Box>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* EN */}
              <Grid size={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name (EN)"
                  size="small"
                  {...register('nameEn', { required: true })}
                />
              </Grid>
              <Grid size={12} sm={6}>
                <TextField
                  fullWidth
                  label="Description (EN)"
                  size="small"
                  {...register('descriptionEn', { required: true })}
                />
              </Grid>

              {/* AR */}
              <Grid size={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name (AR)"
                  size="small"
                  {...register('nameAr', { required: true })}
                />
              </Grid>
              <Grid size={12} sm={6}>
                <TextField
                  fullWidth
                  label="Description (AR)"
                  size="small"
                  {...register('descriptionAr', { required: true })}
                />
              </Grid>

              {/* Price / Discount / Quantity */}
              <Grid size={12} sm={4}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  size="small"
                  {...register('price', { required: true })}
                />
              </Grid>
              <Grid size={12} sm={4}>
                <TextField
                  fullWidth
                  label="Discount"
                  type="number"
                  size="small"
                  {...register('discount')}
                />
              </Grid>
              <Grid size={12} sm={4}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  size="small"
                  {...register('quantity', { required: true })}
                />
              </Grid>

              {/* Category */}
              <Grid size={{ xs: 12, sm: 8, md: 6 }}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  size="small"
                  value={watch('categoryId')}
                  onChange={(e) => setValue('categoryId', e.target.value)}
                  required
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Main Image */}
              <Grid size={{ xs: 12,sm:6 }}>
                <InputLabel sx={{ mb: 1 }}>Main Image</InputLabel>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setMainImage(e.target.files[0])}
                  style={{ width: '100%' }}
                />
              </Grid>

              {/* Submit */}
              <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={createProductMutation.isLoading}
                >
                  {createProductMutation.isLoading ? 'Creating...' : 'Create Product'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
