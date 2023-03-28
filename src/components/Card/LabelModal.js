import { Box, styled } from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import {
   useGetLabelsQuery,
   useUpdateLabelsMutation,
   useAssignLabelsMutation,
} from '../../redux/api/card-crud-api'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import ModalWindow from '../UI/ModalWindow'
import ModalTitle from './ModalTitle'
import AuthInput from '../input/AuthInput'
import Button from '../UI/Button'
import { IconChange } from '../../assets/icons'
import { labelCardModal } from '../../utils/constants/validation'

const LabelModal = () => {
   const [labelId, setLabelId] = useState(null)
   const [value, setValue] = useState('')
   const [color, setColor] = useState(null)

   const { board, setIsActiveMenu, card } = useToggleMenu()
   const { data } = useGetLabelsQuery()
   const [updateLabels] = useUpdateLabelsMutation()

   const [assignLabels] = useAssignLabelsMutation()

   const addEdit = (id, title) => {
      setLabelId(id)
      setValue(title)
   }
   const addAssignLabels = (labelId) => {
      assignLabels({ labelId, cardId: +board })
      setIsActiveMenu('card', board)
   }
   const formik = useFormik({
      initialValues: {
         label: value,
      },

      validationSchema: labelCardModal,

      onSubmit: ({ label }) => {
         const newLabel = {
            description: label,
            color,
            id: labelId,
         }
         updateLabels(newLabel)
         setLabelId(null)
      },
   })

   const { handleChange, handleSubmit, values, errors, touched } = formik
   return (
      <ModalWindow
         open={card === 'label-card'}
         handleClose={() => setIsActiveMenu('card', board)}
      >
         <BoxContainer>
            <ModalTitle>labels</ModalTitle>
            <div className="inProgress">
               {data?.map((item) => (
                  <div key={item.id}>
                     {labelId === item.id ? (
                        <EditInput onSubmit={handleSubmit}>
                           <AuthInput
                              top="true"
                              type="text"
                              name="label"
                              onChange={handleChange}
                              value={values.label}
                              errors={errors.label}
                              touched={touched.label}
                           />
                           <Button
                              type="button"
                              onClick={() => setLabelId(null)}
                           >
                              cancel
                           </Button>
                           <Button
                              type="submit"
                              onClick={() => setColor(item.color)}
                           >
                              Save
                           </Button>
                        </EditInput>
                     ) : (
                        <div className="labels">
                           <StyledBackground
                              onClick={() => addAssignLabels(item.id)}
                              background={item.color}
                           >
                              {item.description}
                           </StyledBackground>
                           <IconChange
                              className="change"
                              onClick={() => addEdit(item.id, item.description)}
                           />
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </BoxContainer>
      </ModalWindow>
   )
}
const BoxContainer = styled(Box)(() => ({
   width: '330px',
   height: '259px',

   '& .labelWrapper': {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '45%',
   },
   '& .title': {
      position: 'relative',
      bottom: '5px',
   },
   '& .inProgress': {
      margin: '10px 0 0 7px',
   },
   '& .labels': {
      display: 'flex',
      marginTop: '10px',
      gap: '12px',
   },
   '& .change': {
      marginTop: '5px',
      cursor: 'pointer',
   },
}))

const StyledBackground = styled('div')(({ background }) => ({
   width: '297px',
   height: '32px',
   display: 'flex',
   alignItems: 'center',
   cursor: 'pointer',
   padding: '8px',
   backgroundImage: `url(${background})`,
   borderRadius: '8px',
   fontSize: '16px',
   fontWeight: '500',
   color: '#FFFFFF',
}))

const EditInput = styled('form')(() => ({
   display: 'flex',
   width: '300px',
   height: '46px',
   marginTop: '10px',
   gap: '5px',
}))

export default LabelModal
