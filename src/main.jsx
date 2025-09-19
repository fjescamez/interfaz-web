import './normalize.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { TabsProvider } from './context/TabsContext.jsx'
import { SessionProvider } from './context/SessionContext.jsx'
import { ClienteFilterProvider } from './context/ClientFilterContext.jsx'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <ClienteFilterProvider>
    <BrowserRouter>
      <TabsProvider>
        <SessionProvider>
          <App />
        </SessionProvider>
      </TabsProvider>
    </BrowserRouter>
  </ClienteFilterProvider>
  //</StrictMode>,
)