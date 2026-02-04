import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Divider, TextField, CircularProgress } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import useAddReview from '../../../hooks/useAddReview';
import { useProductDetails } from '../../../hooks/useProductDetails';

const ProductReview = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useProductDetails(productId);
  
    const reviews = data?.response?.reviews || [];
    console.log('Product Reviews:', reviews);
  const { mutate: addReview, isPending } = useAddReview(productId);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    addReview(
      { rating, comment },
      {
        onSuccess: () => {
          setRating(0);
          setComment('');
        },
      }
    );
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Button onClick={() => navigate(-1)}>← Back to product</Button>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Product Reviews
      </Typography>

      {/* Add Review */}
      <Box sx={{ mb: 4 }}>
        <Typography fontWeight="bold" gutterBottom>
          Add your review
        </Typography>

        <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} />

        <TextField
          fullWidth
          multiline
          rows={3}
          sx={{ my: 2 }}
          label="Your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button variant="contained" disabled={!rating || isPending} onClick={handleSubmit}>
          {isPending ? <CircularProgress size={22} /> : 'Submit Review'}
        </Button>
      </Box>

      <Divider />

      {/* Reviews List */}
      <Box sx={{ mt: 3 }}>
        {isLoading ? (
          <CircularProgress />
        ) : reviews?.length ? (
          reviews.map((review) => (
            <Box
              key={review.id}
              sx={{
                mb: 2,
                p: 2,
                border: '1px solid #eee',
                borderRadius: 2,
              }}
            >
              <Typography fontWeight="bold">{review.userName}</Typography>
              <Rating value={review.rating} readOnly />
              <Typography>{review.comment}</Typography>
            </Box>
          ))
        ) : (
          <Typography color="text.secondary">No reviews yet</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProductReview;
