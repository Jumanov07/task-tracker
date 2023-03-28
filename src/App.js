import { useRoutes } from 'react-router-dom'

import { AppRoutesDefinition } from './routes/app.routes'

import './App.css'

function App() {
   const AppRoutes = useRoutes(AppRoutesDefinition())

   return AppRoutes
}

export default App
