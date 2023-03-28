import { Avatar, Breadcrumbs, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Link from '@mui/material/Link'
import profileback from '../assets/images/profileback.png'
import ChangePhotoProfile from '../components/UI/ChangePhotoProfile'
import ProfileForm from '../components/UI/ProfileForm'

const Profile = ({ userInformation, userRole }) => {
   const [userPhotoProfile, setUserPhotoProfile] = useState(null)
   useEffect(() => {
      setUserPhotoProfile(userInformation.photoLink)
   }, [userInformation.photoLink])

   return (
      <ProfileContent>
         <Background>
            <div role="presentation">
               <Breadcrumbs
                  sx={{ color: 'white', padding: '20px' }}
                  aria-label="breadcrumb"
               >
                  <Link underline="hover" color="inherit" href="/">
                     Workspace
                  </Link>
                  <Typography>Profile</Typography>
               </Breadcrumbs>
            </div>
         </Background>
         <div>
            <ProfileBlock>
               <div>
                  <AvatarUser src={userPhotoProfile} alt="userImg" />
                  {userRole ? (
                     <ChangePhotoProfile
                        setFile={
                           userInformation.photoLink || setUserPhotoProfile
                        }
                     />
                  ) : null}

                  <FullName>{`${userInformation?.name}     ${userInformation?.surname}`}</FullName>
               </div>
               <ProfileForm
                  userInformation={userInformation}
                  userPhoto={userPhotoProfile}
                  userRole={userRole}
               />
            </ProfileBlock>
         </div>
         <InvolvedBlock>
            <InvolvedBlockIcon>
               Involved in projects{' '}
               <BlockIcon>
                  {userInformation.workspaceResponses.length}
               </BlockIcon>
            </InvolvedBlockIcon>
            <ProgectsBlock>
               {userInformation.workspaceResponses?.map((project) => (
                  <ProgectsContent key={project.id}>
                     <StyledAvatar src="/" alt={project.leadPhotoLink} />
                     <div className="ProgectTitle">
                        <p>{project.name}</p>
                        <span>{project.leadName}</span>
                     </div>
                  </ProgectsContent>
               ))}
            </ProgectsBlock>
         </InvolvedBlock>
      </ProfileContent>
   )
}

export default Profile
const ProfileContent = styled('div')(() => ({
   width: '95vw',
   margin: '0 auto',
   marginTop: '20px',
   borderRadius: '8px',
   paddingBottom: '10px',
}))
const Background = styled('div')(() => ({
   backgroundImage: ` url(${profileback})`,
   width: '100%',
   height: '185px',
   backgroundSize: 'cover',
   borderRadius: '8px 8px 0 0 ',
   color: 'white',
}))
const AvatarUser = styled(Avatar)(() => ({
   width: '136px',
   height: '136px',
   borderRadius: '50%',
   position: 'absolute',
   left: '100px',
   top: '185px',
   border: '5px solid #ffffff',
}))
const StyledAvatar = styled(Avatar)(() => ({
   width: '68px',
   height: '66px',
   backgroundColor: '#0079bf',
   borderRadius: '10px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   fontSize: '44px',
}))
const ProfileBlock = styled('div')(() => ({
   width: '746px',
   height: '300px',
   boxSizing: 'border-box',
   padding: 20,
   paddingLeft: '60px',
}))
const FullName = styled('p')(() => ({
   display: 'inline-block',
   fontSize: '20px',
   paddingLeft: '160px',
   fontFamily: 'sans-serif',
}))
const InvolvedBlock = styled('div')(() => ({
   margin: '0 60px 0  60px ',
}))
const InvolvedBlockIcon = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'start',
   alignItems: 'center',
   gap: '10px',
   fontFamily: 'sans-serif',
   fontWeight: '500',
}))
const BlockIcon = styled('span')(() => ({
   minWidth: '18px',
   height: '18px',
   backgroundColor: '#b2b2b2',
   borderRadius: '50%',
   color: 'white',
   textAlign: 'center',
}))
const ProgectsBlock = styled('div')(() => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(2, 32%)',
   gridTemplateRows: 'repeat(1, 1fr)',
   gridRowGap: '8px',
   marginTop: '16px',
}))
const ProgectsContent = styled('div')(() => ({
   width: '300px',
   height: '66px',
   display: 'flex',
   alignItems: 'center',
   textAlign: 'start',
   gap: '10px',
   '& .ProgectAvatar': {
      width: '68px',
      height: '66px',
      backgroundColor: '#0079bf',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '44px',
   },
   '& .ProgectTitle': {
      display: 'flex',
      flexDirection: 'column',
      widht: '66px',
      height: '47px',
      '& p': {
         margin: 0,
         fontSize: '18px',
      },
      '& span ': {
         color: '#b2b2b2',
         display: 'block',
      },
   },
}))
