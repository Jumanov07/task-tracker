import React, { useState } from 'react'
import { Avatar, AvatarGroup, styled } from '@mui/material'
import { useParams } from 'react-router-dom'

import { IconChange } from '../../assets/icons'
import { theme } from '../../assets/styles/theme'

import Menu from '../UI/Menu/Menu'
import InnerPageModal from './Inner-Page-Modal'
import StarCheckbox from '../UI/StarCheckbox'

import { useHandleFavoriteMutation } from '../../redux/api/all-boards-api'
import { useGetCardCountQuery } from '../../redux/api/inner-page-board-api'

const InnerPageColumn = ({ name, favourite, id }) => {
   const { boardId } = useParams()

   const [newName, setNewName] = useState(false)

   const [handleFavourite] = useHandleFavoriteMutation()
   const { data } = useGetCardCountQuery(boardId)
   const addStarCheckbox = (e) => {
      e.preventDefault()
      handleFavourite(id)
   }

   return (
      <PageContainer>
         <div className="wrapperName">
            <div className="titleWithIcon">
               <InnerPageModal
                  boardName={name}
                  newName={newName}
                  setNewName={setNewName}
               />

               <IconChange
                  onClick={() => setNewName(true)}
                  className="iconChange"
               />

               <p className="title">{name}</p>
            </div>

            <p className="columns">
               Columns: <span className="columnsCount">{data?.counter}</span>
            </p>
         </div>

         <div className="secondContainer">
            <div className="columnsData">
               <StyledAvatarGroup
                  total={8}
                  spacing="medium"
                  className="avatarGroup"
               >
                  <StyledAvatar
                     alt="Remy Sharp"
                     src="/static/images/avatar/1.jpg"
                  />
                  <StyledAvatar
                     alt="Travis Howard"
                     src="/static/images/avatar/2.jpg"
                  />
                  <StyledAvatar
                     alt="Agnes Walker"
                     src="/static/images/avatar/4.jpg"
                  />
                  <StyledAvatar
                     alt="Trevor Henderson"
                     src="/static/images/avatar/5.jpg"
                  />
               </StyledAvatarGroup>
            </div>
            <div className="iconStar">
               <StarCheckbox
                  checked={favourite || false}
                  onClick={addStarCheckbox}
               />
            </div>
            <div>
               <Menu />
            </div>
         </div>
      </PageContainer>
   )
}

const PageContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '10px 20px 0px 20px',
   fontFamily: theme.typography.fontFamily,

   '& .iconChange': {
      width: '18px',
      height: '18px',
      cursor: 'pointer',
      '& path': {
         fill: 'white',
      },
   },

   '& .wrapperName': {
      marginTop: '15px',
   },

   '& .titleWithIcon': {
      display: 'flex',
      alignItems: 'center',
      gap: '11px',

      '& .title': {
         color: 'white',
         fontSize: '20px',
      },
   },

   '& .avatarGroup': {
      width: '34px',
      height: '34px',
      fontSize: '14px',
      cursor: 'pointer',
   },

   '& .columns': {
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '16px',
      marginTop: '5px',

      '& .columnsCount': {
         background: '#B2B2B2',
         fontSize: '14px',
         color: 'white',
         borderRadius: '10px',
         textAlign: 'center',
         padding: '3px 5px',
      },
   },

   '& .secondContainer': {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',

      '& .columnsData': {
         display: 'flex',

         '& img': {
            width: '34px',
            height: '34px',
            position: 'relative',
            zIndex: '10',
            marginLeft: '-10px',
         },
      },

      '& .inviteContainer': {
         display: 'flex',
         alignItems: 'center',
         gap: '4px',
         cursor: 'pointer',

         '& p': {
            color: 'white',
            fontSize: '14px',
         },
      },

      '& .iconStar': {
         width: '34px',
         height: '34px',
         background: '#E9E9E9',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         borderRadius: '50%',
         cursor: 'pointer',
      },
   },
}))

const StyledAvatar = styled(Avatar)(() => ({
   width: '34px',
   height: '34px',
}))

const StyledAvatarGroup = styled(AvatarGroup)(() => ({
   '& .MuiAvatarGroup-avatar': {
      width: '34px',
      height: '34px',
      fontSize: '14px',
      position: 'relative',
   },
}))
export default InnerPageColumn
