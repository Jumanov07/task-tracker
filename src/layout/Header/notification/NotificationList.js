import React, { useState } from 'react'
import { Avatar, Stack, styled, Typography } from '@mui/material'
import { RightArrowIcon, BlueDot } from '../../../assets/icons'
import 'aos/dist/aos.css'
import { useLazyMarkOnlyNotificationAsReadQuery } from '../../../redux/api/notification_api'

const NotificationList = ({
   boardName,
   columnName,
   image,
   fullName,
   text,
   dateOfWrite,
   notificationId,
}) => {
   const correctDate = dateOfWrite.split('T').join(' at ')
   const [markAsReadQuery, { data }] = useLazyMarkOnlyNotificationAsReadQuery()
   const [isVisible, setIsVisible] = useState(true)
   const handleMarkAsRead = () => {
      markAsReadQuery(notificationId)
      setIsVisible(false)
   }
   return (
      <>
         {isVisible && (
            <StyledMiniContainer
               className={data && data?.status ? 'fade-right' : ''}
            >
               <div>
                  <Img src={BlueDot} />
                  <TitleOfTheBoardWrapper onClick={handleMarkAsRead}>
                     <p>{boardName}</p>
                     {columnName}
                  </TitleOfTheBoardWrapper>
               </div>

               <AvatarUserName>
                  <ImgAvatarWrapper>
                     <Avatar src={image} className="avatar" />
                  </ImgAvatarWrapper>

                  <h3>{fullName}</h3>
               </AvatarUserName>
               <ReadyList>
                  <h2>{text}</h2>
                  <span>
                     <RightArrowIcon />
                  </span>
               </ReadyList>

               <StyledData>{correctDate}</StyledData>
            </StyledMiniContainer>
         )}

         {isVisible === false && !data?.length && (
            <NothingMessage>{`There's no notifications`}</NothingMessage>
         )}
      </>
   )
}

export default NotificationList

const StyledMiniContainer = styled('div')(() => ({
   width: '318px',
   borderBottom: '1px solid #E3E3E3',
   paddingLeft: '12px',
   paddingBottom: '4px',
   '& div': {
      display: 'flex',
   },
   '&.fade-right': {
      animation: 'fadeOut 1s forwards',
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

const ImgAvatarWrapper = styled(Stack)(() => ({
   padding: '0px 0px 0px 7px',
   '& img': {
      width: '34px',
      height: '34px',
   },
}))

const Img = styled(BlueDot)(() => ({
   position: 'relative',
   top: '10px',
   right: '10px',
}))

const TitleOfTheBoardWrapper = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   width: '300px',
   background: '#CBCBCB',
   borderRadius: '8px',
   marginTop: '12px',
   padding: '16px 16px 80px 16px',
}))

const AvatarUserName = styled('div')(() => ({
   marginTop: '12px',
   '& .avatar': {
      width: '34px',
      height: '34px',
   },
   '& h3': {
      fontSize: '14px',
      fontWeight: '400',
      color: '#111111',
      padding: '10px 0px 0px 10px',
   },
}))

const ReadyList = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   '& h2': {
      fontSize: '16px',
      fontWeight: '500px',
      paddingLeft: '8px',
      color: '#111111',
      width: '269px',
   },
}))

const StyledData = styled('div')(() => ({
   paddingTop: '3px',
   fontSize: '14px',
   fontWeight: '400px',
   color: '#919191',
   marginLeft: '8px',
}))

export const NothingMessage = styled(Typography)(() => ({
   position: 'relative',
   top: '30px',
   left: '80px',
}))
