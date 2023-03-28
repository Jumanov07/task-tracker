import { commonApi } from './common-api'

export const favouritesApi = commonApi.injectEndpoints({
   endpoints: (builder) => ({
      getfavourites: builder.query({
         query: () => 'favourite/getAll',
         providesTags: ['Favourite'],
      }),
      favouritesId: builder.mutation({
         query: (id) => ({
            url: `favourite/${id}`,
            method: 'POST',
         }),
         invalidatesTags: ['Favourite', 'Allboards', 'Workspaces'],
      }),
      workSpaceId: builder.mutation({
         query: (id) => ({
            url: `favourite/workspace/${id}`,
            method: 'POST',
         }),
         invalidatesTags: [
            'Favourite',
            'Allboards',
            'innerPageBoard',
            'Workspaces',
         ],
      }),
   }),
})
export const {
   useGetfavouritesQuery,
   useFavouritesIdMutation,
   useWorkSpaceIdMutation,
} = favouritesApi
