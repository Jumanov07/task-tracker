import { commonApi } from './common-api'

export const checklistApi = commonApi.injectEndpoints({
   endpoints: (build) => ({
      getChecklist: build.query({
         query: (id) => `checklists/${id}`,
         providesTags: ['Checklist'],
      }),
      putChecklist: build.mutation({
         query: (body) => ({ url: '/checklists', method: 'PUT', body }),
         invalidatesTags: ['Checklist'],
      }),
      deleteChecklist: build.mutation({
         query: (id) => ({ url: `/checklists/${id}`, method: 'DELETE' }),
         invalidatesTags: ['Checklist'],
      }),
      changeCheckbox: build.mutation({
         query: (checklistId) => ({
            url: `/items/${checklistId}`,
            method: 'PATCH',
         }),
         invalidatesTags: ['Checklist'],
      }),
      postItem: build.mutation({
         query: ({ checklistId, body }) => ({
            url: `/items/${checklistId}`,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Checklist'],
      }),
   }),
})
export const {
   useGetChecklistQuery,
   usePutChecklistMutation,
   useDeleteChecklistMutation,
   useChangeCheckboxMutation,
   usePostItemMutation,
} = checklistApi
