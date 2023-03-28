import React, { useState } from 'react'

import { useParams } from 'react-router'
import { IconButton, styled, CardHeader } from '@mui/material'

import { toast } from 'react-toastify'
import CardColumn, { StyledCard, StyledDiv } from '../../layout/CardColumn'
import Form from './Form'
import { XIcon } from '../../assets/icons'
import {
   useGetColumnsBoardIdQuery,
   usePostTitleColumnMutation,
} from '../../redux/api/column-api'

const ColumnItem = () => {
   const { boardId } = useParams()
   const [isVisible, setIsVisible] = useState(false)
   const { data, isLoading } = useGetColumnsBoardIdQuery(boardId)
   const [postTitleColumn] = usePostTitleColumnMutation()

   const [value, setValue] = useState('')
   const addColumnHandler = async () => {
      if (value.length >= 3) {
         const newColumn = {
            body: {
               name: value,
            },
            boardId,
         }
         await postTitleColumn(newColumn)
         setIsVisible(false)
         setValue('')
      }
   }

   if (isLoading) {
      toast.loading('Coulmns are loading', { toastId: 'columnsLoad' })
   } else {
      toast.dismiss('columnsLoad')
   }

   return (
      <StyledDivColumn>
         {data?.columnResponses?.map((item) => {
            return <CardColumn {...item} key={item.id} columns={item} />
         })}
         <StyledCard>
            {isVisible ? (
               <>
                  <StyledCardHeader
                     title="Name of the column"
                     action={
                        <IconButton onClick={() => setIsVisible(false)}>
                           <XIcon />
                        </IconButton>
                     }
                  />
                  <Form
                     value={value}
                     onChange={(e) => setValue(e.target.value)}
                     onClick={addColumnHandler}
                     buttonTitle="Create"
                  />
               </>
            ) : (
               <StyledAddColumButton onClick={() => setIsVisible(true)}>
                  +Add a column
               </StyledAddColumButton>
            )}
         </StyledCard>
      </StyledDivColumn>
   )
}

const StyledAddColumButton = styled(StyledDiv)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   color: '#111111',
   lineHeight: '20px',
   fontSize: '16px',
   cursor: 'pointer',
}))

export default ColumnItem

const StyledDivColumn = styled('div')(() => ({
   display: 'flex',
   gap: '8px',
   marginBottom: '10px',
}))

const StyledCardHeader = styled(CardHeader)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0 0 12px ',
   '& .MuiTypography-root ': {
      display: 'flex',
      fontSize: '16px',
      fontWeight: 500,
      color: '#919191',
   },
}))
