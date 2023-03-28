import { commonApi } from './common-api'

export const cardCrudApi = commonApi.injectEndpoints({
   endpoints: (build) => ({
      getLabels: build.query({
         query: () => 'labels',
         providesTags: ['Labels'],
      }),

      updateLabels: build.mutation({
         query: ({ id, description, color }) => {
            return {
               url: `/labels/${id}`,
               method: 'PUT',
               body: { color, description },
            }
         },
         invalidatesTags: ['Labels'],
      }),

      updateCardName: build.mutation({
         query: (body) => ({
            url: '/cards',
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['Labels', 'columnsApi', 'Card'],
      }),

      getAllMembers: build.query({
         query: (id) => `members/getAllMembersByWorkspaceId/${id}`,
         invalidatesTags: ['Labels'],
      }),

      getAllAdmin: build.query({
         query: (id) => `members/getAllAdminsByWorkspaceId/${id}`,
         invalidatesTags: ['Labels'],
      }),

      estimations: build.mutation({
         query: (body) => ({
            url: 'estimations',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Labels'],
      }),

      updateEstimations: build.mutation({
         query: (body) => ({
            url: 'estimations',
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['Labels'],
      }),
      assignLabels: build.mutation({
         query: ({ labelId, cardId }) => ({
            url: `labels/${labelId}/${cardId}`,
            method: 'POST',
         }),
         invalidatesTags: ['Labels'],
      }),
      removeLabels: build.mutation({
         query: ({ cardId, labelId }) => ({
            url: `labels/delete/${cardId}/${labelId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Labels'],
      }),
   }),
})

export const {
   useGetLabelsQuery,
   useUpdateLabelsMutation,
   useUpdateCardNameMutation,
   useGetAllMembersQuery,
   useGetAllAdminQuery,
   useEstimationsMutation,
   useUpdateEstimationsMutation,
   useAssignLabelsMutation,
   useRemoveLabelsMutation,
} = cardCrudApi
