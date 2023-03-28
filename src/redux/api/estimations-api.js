import { commonApi } from './common-api'

export const cardEstimationApi = commonApi.injectEndpoints({
   endpoints: (builder) => ({
      getLabel: builder.query({
         query: (id) => `cards/all/${id}`,
         providesTags: ['Card'],
      }),

      getCardById: builder.query({
         query: (id) => `/cards/${id}`,
         invalidatesTags: ['Card'],
      }),
   }),
})

export const { useGetCardByIdQuery, useGetLabelQuery } = cardEstimationApi
