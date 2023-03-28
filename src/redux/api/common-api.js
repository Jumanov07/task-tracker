import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/constants/general'

export const commonApi = createApi({
   baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
      prepareHeaders: (headers, { getState }) => {
         const { token } = getState().auth

         if (token) {
            headers.set('Authorization', `Bearer ${token}`)
         }
         return headers
      },
      tagTypes: ['authApi'],
   }),
   endpoints: () => ({}),
})
