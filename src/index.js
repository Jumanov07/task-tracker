import React from 'react'

import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './redux'

import { theme } from './assets/styles/theme'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <BrowserRouter>
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <ToastContainer />
            <PersistGate loading={null} persistor={persistor}>
               <App />
            </PersistGate>
         </ThemeProvider>
      </Provider>
   </BrowserRouter>
)
