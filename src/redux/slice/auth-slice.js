import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'

const initialState = {
   isLoggedIn: false,
   token: '',
   email: '',
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      loginAuthorization: (state, action) => {
         const { token, email } = action.payload

         state.isLoggedIn = true
         state.token = token
         state.email = email
      },
   },
   extraReducers: (builder) =>
      builder.addCase(PURGE, () => {
         return initialState
      }),
})

export default authSlice
export const authActions = authSlice.actions
