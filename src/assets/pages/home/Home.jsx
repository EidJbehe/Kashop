import React from 'react'
import Categories from '../../components/categories/Categories.jsx';
import { Box } from '@mui/system';
import ProudctsSection from './../proudcts/ProductsSection';

export default function Home() {
  return (
      <Box >
      <Categories />
      <ProudctsSection />
      
      </Box>
  )
}
