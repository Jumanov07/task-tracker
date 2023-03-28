import React from 'react'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import { ForAllWrapper } from '../UI/Menu/Colors'
import { DYMMY_IMAGES } from '../UI/Menu'
import Photo from '../UI/Menu/Photo'
import ModalWrapper from '../UI/Menu/ModalWrapper'

const PhotoPicker = ({ pickPhoto, setPickPhoto, addHandler }) => {
   const { setIsActiveMenu, board } = useToggleMenu()
   const addPhotoHandler = (id) => {
      setPickPhoto(id)
      addHandler(id)
   }

   return (
      <ModalWrapper
         isOpen={board === 'photo'}
         onCloseMenu={() => setIsActiveMenu('createBoard')}
      >
         <ForAllWrapper>
            {DYMMY_IMAGES.map((photo) => (
               <Photo
                  key={photo.id}
                  {...photo}
                  addHandler={addPhotoHandler}
                  checkMarkIconId={pickPhoto}
               />
            ))}
         </ForAllWrapper>
      </ModalWrapper>
   )
}

export default PhotoPicker
