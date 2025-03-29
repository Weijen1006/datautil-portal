import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.tsx'
import { APP_NAME } from '@/configs/constant'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <title>{APP_NAME}</title>
    <App />
  </StrictMode>,
)
