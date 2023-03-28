import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Button, styled } from '@mui/material'
import { useState } from 'react'
import ProgressBar from './ProgressBar'
import iconDelete from '../../assets/icons/iconDeleteChecklistTitle.svg'
import ChecklistTextField from './ChecklistTextField'
import ChecklistRender from './ClicklistRender'
import { IconAccordion, IconAddanItem } from '../../assets/icons'
import ChangeChecklistTitle from './ChangeChecklistTitle'
import {
   useDeleteChecklistMutation,
   useGetChecklistQuery,
} from '../../redux/api/checklist-api'

export default function ChecklistTitle({ cardId }) {
   const [textFieldActive, setTextField] = useState('')
   const [isActive, setIsAvtive] = useState(false)
   const { data } = useGetChecklistQuery(cardId)
   const [deleteCheck] = useDeleteChecklistMutation()

   const checklistTitle = data ? data[0]?.name : null
   const checklistId = data ? data[0]?.id : null
   const checklistCounts = data ? data[0]?.counts : null
   const persent = data ? data[0]?.percent : null

   const handleTextFieldActive = () => {
      setTextField((prev) => !prev)
   }
   const deleteChecklist = async () => {
      await deleteCheck(checklistId)
   }
   return (
      <BlockChecklist>
         <Accordion
            onClick={() => setIsAvtive(false)}
            sx={{
               boxShadow: 'none',
            }}
         >
            <StyledAccorionSummary expandIcon={<StyledIconAccordion />}>
               <TypographyAccordion
                  onClick={(event) => event.stopPropagation()}
               >
                  <div className="AccordionHead">
                     <div className="ChangeTitleDelete">
                        <ChangeChecklistTitle
                           isActive={isActive}
                           setIsActive={setIsAvtive}
                           checklistTitle={checklistTitle}
                           checklistId={checklistId}
                        />
                        <div className="deletePart">
                           <img
                              onClick={deleteChecklist}
                              src={iconDelete}
                              alt="icon"
                           />
                           <p onClick={deleteChecklist} className="delete">
                              delete
                           </p>
                        </div>
                     </div>
                  </div>
                  <ProgressBar counts={checklistCounts} percent={persent} />
               </TypographyAccordion>
            </StyledAccorionSummary>
            <AccordionDetails
               sx={{ paddingTop: 0, marginTop: '20px', width: '100%' }}
            >
               {textFieldActive && (
                  <ChecklistTextField
                     checklistId={checklistId}
                     onClickCanel={handleTextFieldActive}
                  />
               )}
               <ChecklistRender tasks={data} />
               <AddAnItem variant="outlined" onClick={handleTextFieldActive}>
                  <IconAddanItem />
                  Add an item
               </AddAnItem>
            </AccordionDetails>
         </Accordion>
      </BlockChecklist>
   )
}

const BlockChecklist = styled('div')(() => ({
   width: '600px',
   marginLeft: '19px',
}))

const StyledAccorionSummary = styled(AccordionSummary)(() => ({
   flexDirection: 'row-reverse',
   width: '100%',
   maxHeight: '56px',
   display: 'flex',
   gap: '10px',
   margin: 0,
   padding: 0,
   paddingTop: '10px',
   '& .MuiAccordionSummary-expandIconWrapper': {
      outline: 'none',
      alignSelf: 'start',
   },
   '& .Mui-focusVisible': {
      backgroundColor: 'none',
   },
}))

const TypographyAccordion = styled('div')(() => ({
   width: '99%',
   '& .AccordionHead': {
      border: 'none',
      width: '100%',
      '& .ChangeTitleDelete': {
         paddingTop: '0px',
         display: 'flex',
         justifyContent: 'space-between',
         '& .checklist': { fontWeight: '400' },

         '& .deletePart': {
            display: 'flex',
            alignItems: 'center',
            '& :hover': {
               textDecoration: 'underline',
            },
         },
         '& .delete': {
            color: '#919191',
            fontSize: '16px',
            marginRight: '10px',
            fontWeight: '400',
         },
      },
   },
}))

const StyledIconAccordion = styled(IconAccordion)(() => ({
   transform: 'rotate(180deg)',
   position: 'relative',
   zIndex: '211',
}))

const AddAnItem = styled(Button)(() => ({
   margin: '10px 0 0 76.5%',
   borderColor: '#a1a1a1',
   borderRadius: '8px',
   color: '#000',
   display: 'flex',
   gap: '10px',
}))
