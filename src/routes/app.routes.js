import * as React from 'react'

import { useSelector } from 'react-redux'

import AllBoards from '../components/AllBoards/AllBoards'
import Columns from '../components/Columns/Columns'
import GetProfile from '../components/UI/Profile/GetProfile'
import MyProfile from '../components/UI/Profile/MyProfile'

import NotFoundPage from '../containers/NotFound.Page'
import WorkspacePage from '../containers/Workspace.Page'
import SignInPage from '../containers/SignIn.Page'
import SignUpPage from '../containers/SignUp.Page'
import ForgotPasswordPage from '../containers/Forgot.Password.Page'

import { ROUTES } from '../utils/constants/routes'

import { PrivateAuthRoute } from './PrivateAuthRoute'
import AllIssues from '../components/AllIssues/AllIssues'
import HeaderLayout from '../layout/HeaderLayout'
import ParticipantsList from '../components/Participants/Participants'

const lazyLoading = (name) => {
   return React.lazy(() => import(`../containers/${name}`))
}

const Issue = lazyLoading('Issue.Page')
const BoardsPage = lazyLoading('Boards.Page')
const ProfilePage = lazyLoading('Profile.Page')
const Participants = lazyLoading('Participants.Page')

export const AppRoutesDefinition = () => {
   const { isLoggedIn } = useSelector((state) => state.auth)
   return [
      {
         path: '/',
         element: (
            <React.Suspense fallback="...loading">
               <HeaderLayout />
            </React.Suspense>
         ),
         children: [
            {
               path: ROUTES.INDEX,
               element: (
                  <PrivateAuthRoute
                     Component={<WorkspacePage />}
                     fallbackPath="/sign-in"
                     isAllowed={isLoggedIn}
                  />
               ),
            },
            {
               path: ROUTES.PROFILE,
               element: (
                  <PrivateAuthRoute
                     Component={<ProfilePage />}
                     fallbackPath="/"
                     isAllowed={isLoggedIn}
                  />
               ),
               children: [
                  { path: '', element: <MyProfile /> },
                  { path: ROUTES.PROFILE_ID, element: <GetProfile /> },
               ],
            },
            {
               path: ROUTES.BOARDS,
               element: (
                  <PrivateAuthRoute
                     Component={<BoardsPage />}
                     fallbackPath="/"
                     isAllowed={isLoggedIn}
                  />
               ),
               children: [
                  {
                     path: ROUTES.BOARDS_ID,
                     element: <AllBoards />,
                  },
                  {
                     path: ROUTES.COLUMN_ID,
                     element: <Columns />,
                  },
               ],
            },
            {
               path: ROUTES.PARTICIPANTS,
               element: (
                  <PrivateAuthRoute
                     Component={<Participants />}
                     fallbackPath="/"
                     isAllowed={isLoggedIn}
                  />
               ),
               children: [
                  {
                     path: ROUTES.PARTICIPANTS_ID,
                     element: <ParticipantsList />,
                  },
               ],
            },
            {
               path: ROUTES.ISSUES,
               element: (
                  <PrivateAuthRoute
                     Component={<Issue />}
                     fallbackPath="/"
                     isAllowed={isLoggedIn}
                  />
               ),
               children: [
                  {
                     path: ROUTES.ISSUES_ID,
                     element: <AllIssues />,
                  },
               ],
            },
         ],
      },
      {
         path: ROUTES.SIGN_IN,
         element: (
            <PrivateAuthRoute
               Component={<SignInPage />}
               fallbackPath="/"
               isAllowed={!isLoggedIn}
            />
         ),
      },
      {
         path: ROUTES.SIGN_UP,
         element: (
            <PrivateAuthRoute
               Component={<SignUpPage />}
               fallbackPath="/"
               isAllowed={!isLoggedIn}
            />
         ),
      },
      {
         path: ROUTES.FORGOT,
         element: (
            <PrivateAuthRoute
               Component={<ForgotPasswordPage />}
               fallbackPath="/"
               isAllowed={!isLoggedIn}
            />
         ),
      },
      {
         path: '*',
         element: <NotFoundPage />,
      },
   ]
}
