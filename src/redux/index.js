import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   REGISTER,
   PAUSE,
   PURGE,
   PERSIST,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { allIssuesApi } from './api/all-issues-api'
import { authApi } from './api/auth-api'
import { checklistApi } from './api/checklist-api'
import { columnApi } from './api/column-api'
import { commonApi } from './api/common-api'
import { favouritesApi } from './api/favourites-api'
import { notificationApi } from './api/notification_api'
import { seacrhUsersApi } from './api/search-users-api'
import { workspaceApi } from './api/workspace-api'
import { cardCrudApi } from './api/card-crud-api'
import authSlice from './slice/auth-slice'
import changeWidthColumns from './slice/changeWidthColumns'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   [changeWidthColumns.name]: changeWidthColumns.reducer,
   [authApi.reducerPath]: authApi.reducer,
   [workspaceApi.reducerPath]: workspaceApi.reducer,
   [commonApi.reducerPath]: commonApi.reducer,
   [favouritesApi.reducerPath]: favouritesApi.reducer,
   [allIssuesApi.reducerPath]: allIssuesApi.reducer,
   [columnApi.reducerPath]: columnApi.reducer,
   [cardCrudApi.reducerPath]: cardCrudApi.reducer,
   [seacrhUsersApi.reducerPath]: seacrhUsersApi.reducer,
   [notificationApi.reducerPath]: notificationApi.reducer,
   [checklistApi.reducerPath]: checklistApi.reducer,
})

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['auth', 'workspaceSlice', 'changeWidthColumns'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: persistedReducer,

   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }).concat(commonApi.middleware),
})

export const persistor = persistStore(store)
