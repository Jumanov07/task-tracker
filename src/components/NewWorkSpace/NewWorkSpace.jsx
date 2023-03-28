import React, { useState } from 'react'
import {
   ButtonBase,
   InputBase,
   Modal,
   Paper,
   styled,
   Typography,
} from '@mui/material'
import Button from '../UI/Button'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import PhotoPicker from './PhotoPicker'
import ColorPicker from './ColorPicker'
import { ForAllWrapper } from '../UI/Menu/Colors'
import { DYMMY_IMAGES, DYMMY_INITIAL_COLORS } from '../UI/Menu'
import Color from '../UI/Menu/Color'
import Photo from '../UI/Menu/Photo'

const NewWorkSpace = ({ isOpen, onClick }) => {
   const { setIsActiveMenu, onCloseMenu } = useToggleMenu()

   const [pickBackground, setPickBackground] = useState(null)

   const pickBackgroundHandler = (id) => {
      setPickBackground(id)
   }

   return (
      <div>
         <StyledModal open={isOpen} onClose={() => setIsActiveMenu('')}>
            <ModalWrapper elevation={2}>
               <StyledHeader variant="body2">Create new Board</StyledHeader>
               <StyledInputBase placeholder="Board title*" />
               <StyledCaption>Add Background</StyledCaption>
               <BackgroundPicker>
                  <Typography>Photos</Typography>
                  <ButtonBase
                     onClick={() => setIsActiveMenu('createBoard', 'photo')}
                  >
                     See more
                  </ButtonBase>
               </BackgroundPicker>
               <PhotosWrapper>
                  {DYMMY_IMAGES.slice(0, 3).map((img) => (
                     <Photo
                        key={img.id}
                        addHandler={pickBackgroundHandler}
                        checkMarkIconId={pickBackground}
                        {...img}
                     />
                  ))}
               </PhotosWrapper>
               <BackgroundPicker>
                  <Typography>Colors</Typography>
                  <ButtonBase
                     onClick={() => setIsActiveMenu('createBoard', 'colors')}
                  >
                     See more
                  </ButtonBase>
               </BackgroundPicker>
               <ColorWrapper>
                  {DYMMY_INITIAL_COLORS.slice(0, 6).map((color) => (
                     <Color
                        bottom
                        key={color.id}
                        takeId={pickBackgroundHandler}
                        colorId={pickBackground}
                        {...color}
                     />
                  ))}
               </ColorWrapper>
               <ResetButtons>
                  <Button
                     sx={{ color: '#919191' }}
                     bgcolor="#f0f0f0"
                     hover={{ bgcolor: '#f0f0f0' }}
                     active={{ bgcolor: 'f0f0f0' }}
                     onClick={() => onCloseMenu()}
                  >
                     Cancel
                  </Button>
                  <Button onClick={onClick}>Create board</Button>
               </ResetButtons>
            </ModalWrapper>
         </StyledModal>
         <div />
         <PhotoPicker
            pickPhoto={pickBackground}
            setPickPhoto={setPickBackground}
         />
         <ColorPicker
            pickColor={pickBackground}
            setPickColor={setPickBackground}
         />
      </div>
   )
}

export default NewWorkSpace

const StyledModal = styled(Modal)(() => ({
   '& .MuiBackdrop-root': {
      background: 'none',
   },
}))

const ModalWrapper = styled(Paper)(() => ({
   height: '370px',
   width: '477px',
   background: '#fff',
   borderRadius: '10px',
   animation: 'show-menu .1s forwards',
   '@keyframes show-menu': {
      '0%': {
         opacity: '0',
         transform: 'translateX(200px)',
      },
      '50%': {
         opacity: '1',
      },
      '100%': {
         transform: 'translateY(0px)',
      },
   },
   position: 'absolute',
   right: '10px',
   top: '3px',
}))

const StyledHeader = styled(Typography)(() => ({
   fontSize: '16px',
   display: 'flex',
   justifyContent: 'center',
   marginTop: '16px',
}))

const StyledInputBase = styled(InputBase)(() => ({
   width: '437px',
   height: '32px',
   border: '1px solid #D0D0D0',
   borderRadius: '8px',
   margin: '16px 20px',
   padding: '6px 16px',
}))

const StyledCaption = styled(Typography)(() => ({
   color: '#919191',
   marginLeft: '16px',
   fontSize: '16px',
}))

const BackgroundPicker = styled('div')(() => ({
   width: '437px',
   display: 'flex',
   justifyContent: 'space-between',
   margin: '0 16px',
}))

const PhotosWrapper = styled(ForAllWrapper)(() => ({
   maxWidth: '430px',
   gap: '20px',
   gridTemplateColumns: 'repeat(3,1fr)',
   '& .css-yj3gie': {
      width: '136px',
      height: '62px',
   },
}))

const ColorWrapper = styled(ForAllWrapper)(() => ({
   maxWidth: '480px',
   height: '90px',
   gridTemplateColumns: 'repeat(6,1fr)',
   '& .imgColor': {
      width: '59px',
      height: '91px',
   },
   gap: '16px',
}))

// imgColor css-yj3gie

const ResetButtons = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-end',
   alignItems: 'flex-end',
   marginRight: '20px',
   gap: '10px',
}))
