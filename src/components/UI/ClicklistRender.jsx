import React from 'react'
import { styled } from '@mui/material'
import CheckBox from './CheckBox'
import { useChangeCheckboxMutation } from '../../redux/api/checklist-api'

const ChecklistRender = ({ tasks }) => {
   const [changeCheckbox] = useChangeCheckboxMutation()
   const putChangeCheckbox = async (id) => {
      await changeCheckbox(id)
   }
   return (
      <ul>
         {tasks &&
            tasks[0]?.itemResponses?.map((item) => (
               <StyledLi key={item.id}>
                  <CheckBox
                     onChange={() => putChangeCheckbox(item.id)}
                     checked={item.done}
                  />
                  {item.description}
               </StyledLi>
            ))}
      </ul>
   )
}

export default ChecklistRender

const StyledLi = styled('li')(() => ({
   listStyleType: 'none',
   height: '30px',
   display: 'flex',
   justifyContent: 'flex-start',
   gap: '10px',
   alignItems: 'center',
   padding: '10px',
   '&:nth-of-type(even)': {
      backgroundColor: '#f2f2f2',
      borderRadius: '8px',
   },
}))
