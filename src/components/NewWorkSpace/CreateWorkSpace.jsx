import { styled } from '@mui/material'
import React from 'react'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import Button from '../UI/Button'
import NewWorkSpace from './NewWorkSpace'

const CreateWorkSpace = () => {
   const { setIsActiveMenu, isActive } = useToggleMenu()
   return (
      <>
         <StyledButton
            variant="contained"
            onClick={() => setIsActiveMenu('createBoard')}
         >
            Create new workspace
         </StyledButton>
         <NewWorkSpace isOpen={isActive === 'createBoard'} />
      </>
   )
}

export default CreateWorkSpace
const StyledButton = styled(Button)(() => ({
   width: '154px',
   height: '34px',
   borderRadius: '24px',
   padding: '0',
}))
