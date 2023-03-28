import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from './Button'
import { usePostItemMutation } from '../../redux/api/checklist-api'

const ChecklistTextField = ({ checklistId, onClickCanel }) => {
   const [checked, setChecked] = useState(false)
   const [value, setValue] = useState('')
   const [postItem] = usePostItemMutation()
   const handleChange = () => {
      setChecked((prev) => !prev)
   }
   const addItem = async () => {
      const body = { text: value, isDone: checked }
      await postItem({ checklistId, body })
      onClickCanel()
   }

   return (
      <div>
         <div>
            <Checkbox
               checked={checked}
               onChange={handleChange}
               inputProps={{ 'aria-label': 'controlled' }}
            />
            <StyledTextField
               multiline
               id="outlined-multiline-static"
               rows={3}
               value={value}
               onChange={(e) => setValue(e.target.value)}
            />
         </div>
         <ChecklistButton>
            <CanelButton onClick={onClickCanel} hover="#c9c9c9">
               cancel
            </CanelButton>
            <AddButton onClick={addItem}>add</AddButton>
         </ChecklistButton>
      </div>
   )
}

export default ChecklistTextField
const StyledTextField = styled(TextField)(() => ({
   width: '90%',
   '& .MuiInputBase-root': {
      height: '88px',
      padding: '10px',
   },
   '& .MuiInputBase-input': {
      align: 'flex-start',
   },
}))
const ChecklistButton = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'flex-end',
   gap: '17.77px',
   margin: ' 10px 0',
}))
const CanelButton = styled(Button)(() => ({
   maxWidth: '88px',
   maxHeight: '30px',
   backgroundColor: '#f0f0f0',
   color: '#919191',
}))
const AddButton = styled(Button)(() => ({
   maxWidth: '66px',
   maxHeight: '30px',
}))
