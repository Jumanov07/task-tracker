import { commonApi } from './common-api'

export const profileApi = commonApi.injectEndpoints({
   endpoints: (build) => ({
      getProfile: build.query({
         query: () => 'profile',
         providesTags: ['profile'],
      }),
      putProfile: build.mutation({
         query: (body) => ({ url: 'profile', method: 'PUT', body }),
         invalidatesTags: ['profile'],
      }),
      getProfileId: build.query({
         query: (id) => `profile/${id}`,
      }),
   }),
})
export const {
   useGetProfileQuery,
   usePutProfileMutation,
   useGetProfileIdQuery,
} = profileApi
