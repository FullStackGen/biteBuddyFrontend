import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './RouterConfig.js'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="965761716890-k9iqst2r98t3i2peqq6k1oluti5eag2d.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>,
  </StrictMode>,
)
