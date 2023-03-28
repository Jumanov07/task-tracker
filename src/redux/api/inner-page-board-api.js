import { commonApi } from './common-api'

export const innerPageBoard = commonApi.injectEndpoints({
   endpoints: (builder) => ({
      getCardCount: builder.query({
         query: (id) => `cards/all/${id}`,
         providesTags: ['innerPageBoard'],
      }),

      getInnerPageId: builder.query({
         query: (id) => `boards/${id}`,
         invalidatesTags: ['innerPageBoard', 'Allboards'],
      }),

      innerPageBackground: builder.mutation({
         query: (body) => ({
            url: 'boards',
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['innerPageBoard', 'Allboards'],
      }),

      deleteInnerBoard: builder.mutation({
         query: (id) => ({
            url: `boards/${id}`,
            method: 'DELETE',
            body: id,
         }),
         invalidatesTags: ['innerPageBoard', 'Allboards'],
      }),

      inviteWorkspace: builder.mutation({
         query: (body) => ({
            url: 'members/inviteMemberToWorkspace',
            method: 'POST',
            body,
         }),
      }),

      menuArchive: builder.query({
         query: (id) => `cards/archive/${id}`,
         invalidatesTags: ['innerPageBoard', 'Allboards'],
      }),
   }),
})

export const {
   useGetInnerPageIdQuery,
   useInnerPageBackgroundMutation,
   useDeleteInnerBoardMutation,
   useInviteWorkspaceMutation,
   useMenuArchiveQuery,
   useGetCardCountQuery,
} = innerPageBoard
