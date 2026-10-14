import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { startAnimatedFavicon } from './utils/animatedFavicon'

// Initialize moving animated favicon in the browser tab
startAnimatedFavicon();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
