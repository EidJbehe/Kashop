import React from 'react'
import Categories from '../../components/categories/Categories.jsx';
import Proudcts from '../proudcts/Products.jsx';
import { Box } from '@mui/system';

export default function Home() {
  return (
      <Box >
      <Categories />
      <Proudcts />
      
      </Box>
  )
}
