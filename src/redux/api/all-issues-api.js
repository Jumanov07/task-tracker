import { commonApi } from './common-api'

export const allIssuesApi = commonApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllIssues: builder.query({
         query: ({ workspaceId, params }) => {
            return {
               url: `allIssues/${workspaceId}`,
               params,
            }
         },
      }),
      getAllLabels: builder.query({
         query: () => ({
            url: 'labels',
         }),
      }),
      getAllParticipants: builder.query({
         query: (id) => ({
            url: `members/getAllParticipantsByWorkspaceId/${id}`,
         }),
      }),
   }),
})

export const {
   useGetAllIssuesQuery,
   useGetAllLabelsQuery,
   useGetAllParticipantsQuery,
} = allIssuesApi
