import { commonApi } from './common-api'

export const commentApi = commonApi.injectEndpoints({
   endpoints: (builder) => ({
      getCommentsAll: builder.query({
         query: (id) => `comments/${id}`,
         providesTags: ['Comments'],
      }),
      addCommentText: builder.mutation({
         query: (body) => ({
            url: 'comments',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Comments'],
      }),
      deleteComment: builder.mutation({
         query: (id) => ({
            url: `comments/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Comments'],
      }),
      sendAfterChange: builder.mutation({
         query: (body) => ({
            url: `comments/${body.id}`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['Comments'],
      }),
   }),
})

export const {
   useGetCommentsAllQuery,
   useAddCommentTextMutation,
   useDeleteCommentMutation,
   useSendAfterChangeMutation,
} = commentApi
