import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'



const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <Toaster />

  </StrictMode>,
)
