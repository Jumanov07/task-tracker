import React, { useState } from 'react'
import { styled } from '@mui/material'

const AccordionOne = () => {
   const [open, setOpen] = useState('')
   const handleOpen = () => {
      setOpen((prev) => !prev)
   }
   return (
      <Accordion>
         <div>
            <p onClick={handleOpen}>a</p>
         </div>
         {open && (
            <>
               <AccordionTransform>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                  dolorem totam minus fuga laboriosam doloremque perferendis
                  deleniti expedita est accusamus ad, exercitationem nulla
                  nesciunt explicabo. Veniam ratione rem placeat autem!{' '}
               </AccordionTransform>
               <div>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Consequuntur ea beatae perferendis molestias voluptatibus? Ab
                  enim minima deserunt magnam natus molestiae cum, non tempora
                  doloremque rerum? Ullam animi deleniti distinctio!
               </div>
            </>
         )}
      </Accordion>
   )
}

export default AccordionOne
const Accordion = styled('div')(() => ({
   width: '500px',
   background: 'red',
}))
const AccordionTransform = styled('div')(() => ({
   width: '500px',
   background: 'aqua',
   transitionDuration: '500ms',
   display: 'none',
   '&:hover': {
      display: 'inline-block',
      background: 'red',
   },
}))
