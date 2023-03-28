import * as React from 'react'
import Menu from '@mui/material/Menu'
import styled from '@emotion/styled'

const DropDown = ({
   anchorEl,
   open,
   handleClose,
   maxHeight,
   heigth,
   margin,
   padding,
   width,
   children,
}) => {
   return (
      <div>
         <MenuDrop
            width={width}
            padding={padding}
            margin={margin}
            maxheight={maxHeight}
            heigth={heigth}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
         >
            {children}
         </MenuDrop>
      </div>
   )
}
export default DropDown
const MenuDrop = styled(Menu)(({ width, maxHeight, padding, height }) => ({
   '& .MuiPaper-root': {
      width: width || '30%',
      maxHeight: maxHeight || '',
      height: height || '',
      padding: padding || '',
      '&::-webkit-scrollbar': {
         width: 8,
      },
      '&::-webkit-scrollbar-thumb': {
         borderRadius: 10,
         backgroundColor: '#CBCBCB',
      },
      '&::-webkit-scrollbar-track': {
         borderRadius: 10,
         backgroundColor: 'white',
      },
   },
}))
