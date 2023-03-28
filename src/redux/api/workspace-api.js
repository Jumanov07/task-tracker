import { commonApi } from './common-api'

export const workspaceApi = commonApi.injectEndpoints({
   tagTypes: ['Workspaces'],

   endpoints: (builder) => ({
      getAllWorkspaces: builder.query({
         query: () => 'workspaces',
         providesTags: ['Workspaces'],
      }),
      getSingleWorkspace: builder.query({
         query: (id) => `workspaces/${id}`,
         invalidatesTags: ['Workspaces', 'Favourite', 'Allboards'],
         providesTags: ['SingleWorkspace'],
      }),
      addFavoriteWorkspace: builder.mutation({
         query: (id) => ({
            url: `favourite/workspace/${id}`,
            method: 'POST',
            body: id,
         }),
         invalidatesTags: ['Workspaces', 'Favourite', 'Allboards'],
      }),

      createNewWorkspace: builder.mutation({
         query: (body) => ({
            url: 'workspaces',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Workspaces', 'Favourite', 'Allboards'],
      }),
      deleteWorkspace: builder.mutation({
         query: (id) => ({
            url: `workspaces/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Workspaces', 'Favourite', 'Allboards'],
      }),

      updateWorkspaceName: builder.mutation({
         query: ({ id, body }) => ({
            url: `workspaces/${id}`,
            method: 'PATCH',
            body,
         }),
         invalidatesTags: ['Workspaces', 'Favourite', 'Allboards'],
      }),
   }),
})

export const {
   useGetAllWorkspacesQuery,
   useGetSingleWorkspaceQuery,
   useAddFavoriteWorkspaceMutation,
   useCreateNewWorkspaceMutation,
   useDeleteWorkspaceMutation,
   useUpdateWorkspaceNameMutation,
   useLazyGetSingleWorkspaceQuery,
} = workspaceApi
