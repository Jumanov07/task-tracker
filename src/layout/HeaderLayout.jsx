import { styled } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useParams } from 'react-router'
import { ROUTES } from '../utils/constants/routes'
import Header from './Header/Header'
import Sidebar from './sidebar'

const HeaderLayout = () => {
   const location = useLocation()
   const { workspaceId } = useParams()
   const { profileID } = useSelector((state) => state.changeWidthColumns)

   return (
      <StyleBoardsPage>
         <Header />
         <main style={{ display: 'flex', width: '100vw' }}>
            {location.pathname !== ROUTES.INDEX &&
            location.pathname !== ROUTES.PROFILE &&
            location.pathname !== `${ROUTES.PROFILE}/${profileID}` ? (
               <Sidebar boardid={workspaceId} />
            ) : (
               ''
            )}
            <Outlet />
         </main>
      </StyleBoardsPage>
   )
}

const StyleBoardsPage = styled('div')(() => ({
   minWidth: '91vw',
   minHeight: '93vh',
   backgroundSize: 'cover',
   backgroundPosition: 'center',
   backgroundRepeat: 'no-repeat',

   '& .css-k008qs': {
      width: '90%',
   },
}))

export default HeaderLayout
