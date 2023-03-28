import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   columnWidth: null,
   profileID: null,
   columnId: null,
}

const changeWidthColumns = createSlice({
   name: 'changeWidthColumns',
   initialState,
   reducers: {
      changeWidth(state, actions) {
         state.columnWidth = actions.payload === 'rtl' ? true : null
      },
      profileById: (state, action) => {
         state.profileID = action.payload
      },
      addColumnById: (state, action) => {
         state.columnId = action.payload
      },
   },
})

export default changeWidthColumns
export const changeWidthActions = changeWidthColumns.actions
