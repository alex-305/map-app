import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Map from '@/pages/Home'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Map/>
  </StrictMode>,
)
