import { toast } from 'react-toastify'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase/config'

import { authActions } from '../slice/auth-slice'

import { commonApi } from './common-api'

export const authApi = commonApi.injectEndpoints({
   endpoints: (builder) => ({
      loginUser: builder.mutation({
         query: (body) => ({
            url: 'auth/login',
            method: 'POST',
            body,
         }),
         async onQueryStarted(_, { queryFulfilled, dispatch }) {
            try {
               const { data: credentials } = await queryFulfilled

               const loginData = {
                  token: credentials.jwt,
                  email: credentials.email,
               }

               dispatch(authActions.loginAuthorization(loginData))
            } catch (error) {
               toast.error(error?.message)
            }
         },
      }),

      registerUser: builder.mutation({
         query: (body) => ({
            url: 'auth/registration',
            method: 'POST',
            body,
         }),

         async onQueryStarted(_, { queryFulfilled, dispatch }) {
            try {
               const { data: credentials } = await queryFulfilled

               const registerData = {
                  token: credentials.jwt,
                  email: credentials.email,
               }

               dispatch(authActions.loginAuthorization(registerData))
            } catch (error) {
               toast.error(error?.message)
            }
         },
      }),

      resetPassword: builder.mutation({
         query: (body) => ({
            url: 'profile/reset/password',
            method: 'PUT',
            body,
         }),
      }),

      forgotPassword: builder.mutation({
         query: (body) => ({
            url: 'profile/forgot/password',
            method: 'POST',
            params: {
               email: body.email,
               link: body.link,
            },
         }),
      }),

      signInWithGoogle: builder.mutation({
         queryFn: async (_, { dispatch }) => {
            const provider = new GoogleAuthProvider()

            try {
               const response = await signInWithPopup(auth, provider)

               const googleData = {
                  token: response.user.accessToken,
                  email: response.user.email,
               }

               dispatch(authActions.loginAuthorization(googleData))

               return googleData
            } catch (error) {
               return toast.error(error?.message)
            }
         },
      }),
   }),
   overrideExisting: true,
})

export const {
   useLoginUserMutation,
   useRegisterUserMutation,
   useForgotPasswordMutation,
   useResetPasswordMutation,
   useSignInWithGoogleMutation,
} = authApi
