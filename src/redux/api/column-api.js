import { commonApi } from './common-api'

export const columnApi = commonApi.injectEndpoints({
   endpoints: (build) => ({
      getColumnsBoardId: build.query({
         query: (boardId) => `cards/all/${boardId}`,
         providesTags: ['columnsApi'],
      }),
      postTitleColumn: build.mutation({
         query: ({ body, boardId }) => ({
            url: `/columns/${boardId}`,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['columnsApi', 'innerPageBoard'],
      }),
      deleteColumn: build.mutation({
         query: (id) => ({ url: `columns/${id}`, method: 'DELETE' }),
         invalidatesTags: ['columnsApi'],
      }),
      addCard: build.mutation({
         query: (body) => ({ url: '/cards', method: 'POST', body }),
         invalidatesTags: ['columnsApi'],
      }),
      deleteAllCard: build.mutation({
         query: (cardId) => ({ url: `/cards/all/${cardId}`, method: 'DELETE' }),
         invalidatesTags: ['columnsApi'],
      }),
      arhiveAllCards: build.mutation({
         query: (cardId) => ({ url: `/cards/all/${cardId}`, method: 'PUT' }),
         invalidatesTags: ['columnsApi'],
      }),
      deleteCardArchived: build.mutation({
         query: (id) => ({
            url: `cards/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['columnsApi'],
      }),
      unarchivingCard: build.mutation({
         query: (id) => ({
            url: `cards/${id}`,
            method: 'PUT',
         }),
         invalidatesTags: ['columnsApi'],
      }),
   }),
})
export const {
   useGetColumnsBoardIdQuery,
   usePostTitleColumnMutation,
   useDeleteColumnMutation,
   useAddCardMutation,
   useDeleteAllCardMutation,
   useArhiveAllCardsMutation,
   useDeleteCardArchivedMutation,
   useUnarchivingCardMutation,
} = columnApi
