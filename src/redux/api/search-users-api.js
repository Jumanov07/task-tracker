import { commonApi } from './common-api'

export const seacrhUsersApi = commonApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllUsers: builder.query({
         query: ({ workspaceId, params }) => ({
            url: `members/search/${workspaceId}`,
            params,
         }),
      }),
   }),
})

export const { useGetAllUsersQuery } = seacrhUsersApi
