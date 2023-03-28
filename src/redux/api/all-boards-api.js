import { commonApi } from './common-api'

export const allBoardsApi = commonApi.injectEndpoints({
   endpoints: (build) => ({
      getAllBoards: build.query({
         query: (id) => `boards/all/${id}`,
         providesTags: ['Allboards'],
      }),
      handleFavorite: build.mutation({
         query: (id) => ({ url: `/favourite/${id}`, method: 'POST' }),
         invalidatesTags: ['Allboards', 'Favourite', 'innerPageBoard'],
      }),

      createBoard: build.mutation({
         query: (body) => ({ url: '/boards', method: 'POST', body }),
         invalidatesTags: ['Allboards', 'Favourite', 'innerPageBoard'],
      }),
   }),
})

export const {
   useGetAllBoardsQuery,
   useHandleFavoriteMutation,
   useCreateBoardMutation,
} = allBoardsApi
