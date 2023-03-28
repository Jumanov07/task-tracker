import React from 'react'

import { Navigate } from 'react-router-dom'

export const PrivateAuthRoute = ({ Component, fallbackPath, isAllowed }) => {
   if (!isAllowed) {
      return <Navigate to={fallbackPath} replace />
   }
   return Component
}
