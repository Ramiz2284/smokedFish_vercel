import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
	<StrictMode>
		<App />
	</StrictMode>
)

// The page is prerendered as static HTML for crawlers and no-JS visitors.
// Mounting with createRoot avoids brittle hydration mismatches on Vercel.
createRoot(container).render(app)
