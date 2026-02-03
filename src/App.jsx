import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './route'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LanguageManager from './utils/LanguageManager'
import { ThemeProvider } from '@mui/material'
import getTheme from './theme'
import { useMemo } from 'react';
import useThemeStore from './assets/store/useThemeStore'

export default function App() {
  const queryClient = new QueryClient();
  const mode = useThemeStore((state) => state.themeMode);
  const theme = useMemo(() => getTheme(mode), [mode]);
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageManager />
      <ThemeProvider theme={theme}>
         <RouterProvider router={router} />

      </ThemeProvider>
    </QueryClientProvider>
     
  )
}
