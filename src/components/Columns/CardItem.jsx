import React, { useState } from 'react'

import { Paper, styled, Typography, Box, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import {
   CompleteIcon,
   ListIconInColumnCard,
   MemberIcon,
   MessageIcon,
   TimerIcon,
} from '../../assets/icons'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import { changeWidthActions } from '../../redux/slice/changeWidthColumns'

const CardItem = ({
   labelResponses,
   duration,
   description,
   numOfItems,
   numOfCompletedItems,
   numOfMembers,
   name,
   id,
   columnId,
}) => {
   const [isLabelVisible, setIsLabelVisible] = useState(false)
   const { setIsActiveMenu } = useToggleMenu()
   const dispatch = useDispatch()

   const addModalCard = () => {
      setIsActiveMenu('card', id)
      dispatch(changeWidthActions.addColumnById(columnId))
   }

   return (
      <StyledPaper
         data-aos="fade-right"
         data-aos-offset="300"
         data-aos-easing="ease-in-sine"
         draggable="true"
         elevation={0}
         onClick={addModalCard}
      >
         <StyledBox>
            {labelResponses
               ? labelResponses.map((status) => {
                    return (
                       <StyledLabels
                          key={status.id}
                          color={status.color}
                          className={isLabelVisible ? 'see' : 'gost'}
                          onClick={() => setIsLabelVisible((prev) => !prev)}
                       >
                          {isLabelVisible ? status.description : ''}
                       </StyledLabels>
                    )
                 })
               : null}
         </StyledBox>

         <StyledTypography>{name}</StyledTypography>
         <Grid container spacing={1.7}>
            <Grid item xs={4.3}>
               {duration ? (
                  <StyledDeatline>
                     <TimerIcon />
                     <DeatlineTime>{duration}</DeatlineTime>
                  </StyledDeatline>
               ) : null}
            </Grid>
            <Grid item xs={1.2}>
               {!description ? <ListIconInColumnCard /> : null}
            </Grid>
            <Grid item xs={1.5}>
               {numOfItems ? <MessageIcon /> : null}
            </Grid>
            <Grid item xs={2.5}>
               {!numOfCompletedItems ? (
                  <StyledDivCardItem>
                     <CompleteIcon />
                     <p>
                        {numOfCompletedItems}/{numOfItems}
                     </p>
                  </StyledDivCardItem>
               ) : null}
            </Grid>
            <Grid item xs={2.5}>
               {numOfMembers ? (
                  <StyledDivCardItem>
                     <MemberIcon />
                     <p>{numOfMembers}</p>
                  </StyledDivCardItem>
               ) : null}
            </Grid>
         </Grid>
      </StyledPaper>
   )
}
export const StyledDiv = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0 8px 0 ',
   color: 'rgba(0, 0, 0, 1)',
   fontSize: '16px',
   lineHeight: '20px',
}))

export default CardItem

const StyledPaper = styled(Paper)(() => ({
   padding: '0 8px 8px',
   marginBottom: '8px',
   boxSizing: 'border-box',
   wordWrap: 'break-word',
}))

const StyledBox = styled(Box)(() => ({
   display: 'flex',
   gap: '9px',
   flexWrap: 'wrap',
   padding: '8px 0px',
   alignItems: 'flex-start',
}))

const StyledLabels = styled('button')(({ color }) => ({
   border: 'none',
   backgroundImage: `url(${color})`,
   borderRadius: '8px',
   fontSize: '12px',
   fontWeight: '500',
   color: '#fff',
   cursor: 'pointer',

   '&.see': {
      display: 'inline-flex',
      padding: '0 10px',
   },
   '&.gost ': {
      width: '16.50%',
      height: '5px',
   },
}))

const StyledTypography = styled(Typography)(() => ({
   textAlign: 'left',
   marginBottom: '10px',
   fontSize: '16px',
   color: '#000000',
}))

const StyledDeatline = styled('div')(() => ({
   display: 'inline-flex',
   gap: '5px',
   borderRadius: '8px',
   alignItems: 'center',
   background: '#F9DCB4',
   alignContent: 'start',
   padding: '2px 8px 2px 8px',
}))

const DeatlineTime = styled('p')(() => ({
   fontWeight: 500,
   fontSize: '14px',
   lineHeight: '18px',
   color: ' #C7852C',
}))

const StyledDivCardItem = styled('div')(() => ({
   display: 'flex',
   gap: '5px',
   alignItems: 'center',
   color: ' rgba(110, 110, 110, 1)',
}))
