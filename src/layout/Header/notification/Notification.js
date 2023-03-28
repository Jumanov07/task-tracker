import React, { useState } from 'react'

import { Badge, Menu, styled } from '@mui/material'

import { Notifications } from '../../../assets/icons'
import NotificationList, { NothingMessage } from './NotificationList'
import {
   useGetAllNotificationsQuery,
   useMarkAllNotificationsAsReadMutation,
} from '../../../redux/api/notification_api'

const Notification = () => {
   const [anchorEl, setAnchorEl] = useState(null)

   const [blueDotIsActive, setBlueDotIsActive] = useState(null)
   const { data } = useGetAllNotificationsQuery()
   const [isVisibleNotifications, setIsVisibleNotifications] = useState(true)

   const handleMenu = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   const [markAsRead] = useMarkAllNotificationsAsReadMutation()

   const filteredNotifications = data?.filter((item) => !item.status)
   const notifLength = filteredNotifications?.length

   const handleReadAllNotifications = () => {
      markAsRead()
      setIsVisibleNotifications(false)
   }

   return (
      <>
         <Badge
            onClick={handleMenu}
            color="error"
            badgeContent={notifLength}
            classes={{ root: 'badge' }}
         >
            <Notifications />
         </Badge>

         <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
         >
            <StyledContainerWrraper>
               <H2Notification>
                  <span>Notification</span>
                  {filteredNotifications?.length !== 0 && (
                     <SpanMark onClick={handleReadAllNotifications}>
                        Mark as read
                     </SpanMark>
                  )}
               </H2Notification>
               {isVisibleNotifications &&
                  filteredNotifications?.map((item) => (
                     <NotificationList
                        key={item.notificationId}
                        {...item}
                        setBlueDotIsActive={setBlueDotIsActive}
                        blueDotIsActive={blueDotIsActive}
                        className={
                           isVisibleNotifications || 'readedNotification'
                        }
                     />
                  ))}
               {!filteredNotifications?.length && (
                  <NothingMessage>{`There's no notifications `}</NothingMessage>
               )}
            </StyledContainerWrraper>
         </Menu>
      </>
   )
}

export default Notification

const StyledContainerWrraper = styled('div')(() => ({
   width: '361px',
   paddingLeft: '16px',
   paddingBottom: '50px',
   '& .readedNotification': {
      animation: 'fadeOut 1.5s forwards',
      '@keyframes fadeOut': {
         '0%': {
            opacity: '1',
            transform: 'translateY(0px)',
         },
         '100%': {
            opacity: '0',
            display: 'none',
            transform: 'translateX(50px)',
         },
      },
   },
}))

const H2Notification = styled('h2')(() => ({
   fontSize: '17px',
   fontWeight: '400',
   color: '#000000',
   paddingLeft: '120px',
   marginTop: '10px',
}))

const SpanMark = styled('span')(() => ({
   width: '82px',
   height: '18px',
   fontSize: '15px',
   fontWeight: '400',
   color: '#919191',
   borderBottom: '1px solid #919191',
   margin: '12px 0px 0px 24px',
   cursor: 'pointer',
}))
