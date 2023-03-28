import { commonApi } from './common-api'

export const notificationApi = commonApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllNotifications: builder.query({
         query: () => 'notification',
         providesTags: ['allNotifications'],
      }),
      markOnlyNotificationAsRead: builder.query({
         query: (notificationId) => `notification/${notificationId}`,
         invalidatesTags: ['allNotifications'],
      }),
      markAllNotificationsAsRead: builder.mutation({
         query: () => ({
            url: 'notification',
            method: 'PUT',
         }),
         invalidatesTags: ['allNotifications'],
      }),
   }),
})
export const {
   useGetAllNotificationsQuery,
   useMarkAllNotificationsAsReadMutation,
   useLazyMarkOnlyNotificationAsReadQuery,
} = notificationApi
