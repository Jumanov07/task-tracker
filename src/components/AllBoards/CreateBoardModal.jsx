import React, { useState } from 'react'
import {
   Button,
   ButtonBase,
   InputBase,
   styled,
   Typography,
} from '@mui/material'

import { useCreateBoardMutation } from '../../redux/api/all-boards-api'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import ColorPicker from '../NewWorkSpace/ColorPicker'
import PhotoPicker from '../NewWorkSpace/PhotoPicker'
import { DYMMY_COLORS, DYMMY_IMAGES } from '../UI/Menu'
import Color from '../UI/Menu/Color'
import { ForAllWrapper } from '../UI/Menu/Colors'
import Photo from '../UI/Menu/Photo'
import ModalWindow from '../UI/ModalWindow'

const CreateBoardModal = ({ isOpen, workspaceId }) => {
   const [createBoard] = useCreateBoardMutation()
   const { setIsActiveMenu, onCloseMenu } = useToggleMenu()
   const [idBackground, setIdBackground] = useState(null)
   const [titleBoard, setTitleBoard] = useState('')
   const [backgroundBoard, setBackgroundBoard] = useState('')
   const pickBackgroundHandler = (id) => {
      const newId = DYMMY_IMAGES.find((item) => item.id === id)
      setBackgroundBoard(newId.image)
      setIdBackground(id)
   }

   const colorBackgroundHandler = (id) => {
      const newId = DYMMY_COLORS.find((item) => item.id === id)
      setBackgroundBoard(newId.image)
      setIdBackground(id)
   }

   const createNewBoard = async () => {
      if (titleBoard && backgroundBoard) {
         const newBoard = {
            name: titleBoard,
            background: backgroundBoard,
            workspaceId,
         }
         await createBoard(newBoard)
         setIsActiveMenu('')
         onCloseMenu()
      }
   }
   return (
      <StyledModalWindow
         handleClose={onCloseMenu}
         open={!!isOpen}
         title="Create new board"
         actions={
            <>
               <Cancel onClick={onCloseMenu} variant="contained">
                  cancel
               </Cancel>
               <CreateButton variant="contained" onClick={createNewBoard}>
                  Create board
               </CreateButton>
            </>
         }
      >
         <>
            <StyledInputBase
               placeholder="Board title*"
               value={titleBoard}
               onChange={(e) => setTitleBoard(e.target.value)}
            />

            <StyledCaption>Add Background</StyledCaption>
            <BackgroundPicker>
               <Typography sx={{ color: '#919191' }}>Photos</Typography>
               <ButtonBase
                  sx={{ color: '#919191' }}
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
                     checkMarkIconId={idBackground}
                     {...img}
                  />
               ))}
            </PhotosWrapper>
            <BackgroundPicker>
               <Typography sx={{ color: '#919191' }}>Colors</Typography>
               <ButtonBase
                  sx={{ color: '#919191' }}
                  onClick={() => setIsActiveMenu('createBoard', 'colors')}
               >
                  See more
               </ButtonBase>
            </BackgroundPicker>
            <ColorWrapper>
               {DYMMY_COLORS.slice(0, 6).map((color) => (
                  <Color
                     key={color.id}
                     takeId={colorBackgroundHandler}
                     colorId={idBackground}
                     {...color}
                  />
               ))}
            </ColorWrapper>
            <PhotoPicker
               addHandler={pickBackgroundHandler}
               pickPhoto={idBackground}
               setPickPhoto={setIdBackground}
            />
            <ColorPicker
               addHandler={colorBackgroundHandler}
               pickColor={idBackground}
               setPickColor={setIdBackground}
            />
         </>
      </StyledModalWindow>
   )
}

export default CreateBoardModal

const StyledModalWindow = styled(ModalWindow)(() => ({
   width: '500px',
}))

const ColorWrapper = styled(ForAllWrapper)(() => ({
   maxWidth: '30px',
   gridTemplateColumns: 'repeat(6,1fr)',
   '& .css-yj3gie': {
      width: '59px',
      height: '31px',
   },
   gap: '16px',
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
const StyledInputBase = styled(InputBase)(() => ({
   width: '437px',
   height: '32px',
   border: '1px solid #D0D0D0',
   borderRadius: '8px',
   margin: '16px 20px',
   padding: '6px 16px',
   textAlign: 'start',
}))
const StyledCaption = styled(Typography)(() => ({
   color: '#919191',
   marginLeft: '16px',
   fontSize: '16px',
   '&.MuiTypography-root ': {
      textAlign: 'start',
   },
}))
const BackgroundPicker = styled('div')(() => ({
   width: '437px',
   display: 'flex',
   justifyContent: 'space-between',
   margin: '0 16px',
}))
const Cancel = styled(Button)(() => ({
   width: '78px',
   height: '34px',
   borderRadius: '24px',
   backgroundColor: '#e7e7e7',
   boxShadow: 'none',
   color: '#616362',
   '&:hover': {
      background: '#7e7e7e',
   },
}))
const CreateButton = styled(Button)(() => ({
   height: '34px',
   borderRadius: '24px',
}))
