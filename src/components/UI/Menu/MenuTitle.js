import React from 'react'
import { styled } from '@mui/material'
import { Remove, LeftArrowIcon } from '../../../assets/icons'
import { useToggleMenu } from '../../../utils/hooks/useToggleMenu'

const MenuTitle = ({ iconForBack, imgRemove }) => {
   const { isActive } = useToggleMenu()

   return (
      <MenuTitleRemoveWrapper>
         <span>
            {iconForBack ? (
               <LeftArrowIcon onClick={iconForBack} className="img" />
            ) : null}
         </span>
         <h1>{isActive}</h1>
         <span>
            {imgRemove ? <Remove onClick={imgRemove} className="img" /> : null}
         </span>
      </MenuTitleRemoveWrapper>
   )
}

export default MenuTitle

const MenuTitleRemoveWrapper = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0px 17px 5px 13px',
   alignItems: 'center',
   '& h1': {
      fontSize: '16px',
      fontWeight: '400',
      textTransform: 'capitalize',
   },
   '& .img': {
      width: '20px',
      textAlign: 'center',
   },
}))
