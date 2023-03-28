import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { toast } from 'react-toastify'
import iconChange from '../../assets/icons/iconShapeChecklistTitle.svg'
import AuthInput from '../input/AuthInput'
import { usePutChecklistMutation } from '../../redux/api/checklist-api'

const ChangeChecklistTitle = ({
   checklistTitle = '',
   isActive,
   setIsActive,
   checklistId,
}) => {
   const [value, setValue] = useState('')
   const [putChecklist, { isSuccess }] = usePutChecklistMutation()
   useEffect(() => {
      if (isSuccess) {
         toast.success('Name  changed')
      }
   }, [isSuccess])
   useEffect(() => {
      setValue(checklistTitle)
   }, [checklistTitle])

   const handleIsActive = async () => {
      setIsActive()
      await putChecklist({ name: value, id: checklistId })
   }
   return (
      <div>
         {!isActive && (
            <StyledImg
               src={iconChange}
               onClick={() => setIsActive((prev) => !prev)}
               alt="icon"
            />
         )}
         {isActive ? (
            <form onSubmit={handleIsActive}>
               <StyledSearch
                  type="text"
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
               />
            </form>
         ) : (
            <span className="checklist"> {checklistTitle}</span>
         )}
      </div>
   )
}

export default ChangeChecklistTitle
const StyledSearch = styled(AuthInput)(() => ({
   width: '400px',
   height: '5%',
}))

const StyledImg = styled('img')(() => ({
   marginRight: '10px',
}))
