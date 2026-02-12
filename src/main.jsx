import './normalize.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { TabsProvider } from './context/TabsContext.jsx'
import { SessionProvider } from './context/SessionContext.jsx'
import { ClienteFilterProvider } from './context/ClientFilterContext.jsx'
import { InputPistolaProvider } from './context/InputPistolaContext.jsx'
import { TabStateProvider } from './context/TabStateContext'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <ClienteFilterProvider>
    <SessionProvider>
      <HashRouter>
        <TabStateProvider>
          <TabsProvider>
            <InputPistolaProvider>
              <App />
            </InputPistolaProvider>
          </TabsProvider>
        </TabStateProvider>
      </HashRouter>
    </SessionProvider>
  </ClienteFilterProvider>
  //</StrictMode>,
)