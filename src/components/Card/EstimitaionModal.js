import React, { useState } from 'react'
import { MenuItem, Select, styled, TextField } from '@mui/material'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { format } from 'date-fns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { DateField, DesktopTimePicker } from '@mui/x-date-pickers'

import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import ModalWindow from '../UI/ModalWindow'
import Button from '../UI/Button'
import ModalTitle from './ModalTitle'
import {
   useEstimationsMutation,
   useUpdateEstimationsMutation,
} from '../../redux/api/card-crud-api'
import { useGetCardByIdQuery } from '../../redux/api/estimations-api'

const EstimitaionModal = () => {
   const { board, setIsActiveMenu, card, isActive } = useToggleMenu()
   const [estimations] = useEstimationsMutation()
   const [updateEstimations] = useUpdateEstimationsMutation()
   const newTime = dayjs().set('HH').set('MM')
   const [time, setTime] = useState(newTime)
   const [select, setSelect] = React.useState('')
   const [date, setDate] = React.useState([])
   const { data } = useGetCardByIdQuery(board, { skip: isActive !== 'card' })

   const { estimationResponse } = data || {}

   const start = date[0]
   const finish = date[1]

   const formatDate = (valueDate, isShowDate) => {
      const dats = new Date(valueDate || 'Tue Mar 01 2023 00:00:00 GMT+0600')

      const startDate = new Date(newTime?.$d)
      const formatstartDate = format(startDate, 'HH:mm')
      const year = dats.getFullYear()
      const month = String(dats.getMonth() + 1).padStart(2, '0')
      const day = String(dats.getDate()).padStart(2, '0')
      const currentTime = new Date(time?.$d)
      const formattedTime = format(currentTime, 'hh:mm')
      const isShow = isShowDate ? formattedTime : `${formatstartDate}`
      const formattedDate = `${year}-${month}-${day} ${isShow}`
      return formattedDate
   }

   const handleChange = (event) => {
      setSelect(event.target.value)
   }
   const handleTimeChange = (newValue) => {
      setTime(newValue)
   }

   const addDate = (value) => {
      setDate(value)
   }

   const addEstimation = () => {
      if (estimationResponse === null) {
         const newEstimation = {
            reminderRequest: select,
            dateOfStart: formatDate(start),
            dateOfFinish: formatDate(finish, true),
            id: +board,
         }
         estimations(newEstimation)
         setIsActiveMenu('card', board)
      } else {
         const newEstimations = {
            reminderRequest: select,
            dateOfStart: formatDate(start),
            dateOfFinish: formatDate(finish, true),
            id: estimationResponse.id,
         }
         updateEstimations(newEstimations)
         setIsActiveMenu('card', board)
      }
   }
   return (
      <ModalWindow
         open={card === 'estimation-card'}
         handleClose={() => setIsActiveMenu('card', board)}
      >
         <StyledModalContainer>
            <ModalTitle>Estimation</ModalTitle>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DemoContainer
                  components={[
                     'DateRangeCalendar',
                     'DateRangeCalendar',
                     'TimePicker',
                  ]}
               >
                  <DemoItem>
                     <StyledDateRangeCalendar
                        value={date}
                        onChange={addDate}
                        calendars={1}
                     />
                  </DemoItem>
               </DemoContainer>
            </LocalizationProvider>
            <div
               style={{
                  marginLeft: '15px',
                  position: 'relative',
                  bottom: '70px',
               }}
            >
               <StartDate>
                  <h4>Start Date</h4>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DateField value={date[0]} className="input" />
                  </LocalizationProvider>
               </StartDate>
               <DueDate>
                  <h3 className="date">Due Date</h3>
                  <div className="dateWrapper">
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField value={date[1]} className="input" />
                     </LocalizationProvider>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem>
                           <DesktopTimePicker
                              className="input"
                              value={time}
                              onChange={handleTimeChange}
                              renderInput={(params) => (
                                 <TextField {...params} />
                              )}
                           />
                        </DemoItem>
                     </LocalizationProvider>
                  </div>
               </DueDate>
               <SelectReminder>
                  <h4>Set due date reminder</h4>

                  <Select
                     className="input"
                     value={select}
                     onChange={handleChange}
                  >
                     <MenuItem value="">
                        <em>None</em>
                     </MenuItem>
                     <MenuItem value="5 min. before">5 min. before</MenuItem>
                     <MenuItem value="15 min. before">15 min. before</MenuItem>
                     <MenuItem value="30 min. before">30 min. before</MenuItem>
                     <MenuItem value="1 hour before">1 hour before</MenuItem>
                  </Select>
               </SelectReminder>
               <StyledButton onClick={addEstimation}>
                  Create a new template
               </StyledButton>
            </div>
         </StyledModalContainer>
      </ModalWindow>
   )
}

const StyledDateRangeCalendar = styled(DateRangeCalendar)(() => ({
   position: 'relative',
   bottom: '20px',
   '& .MuiInputBase-input': { border: 'none' },

   '& .MuiSvgIcon-fontSizeInherit': {
      display: 'flex',
      justifyContent: 'space-between',
   },
}))

const StyledModalContainer = styled('div')(() => ({
   width: '310px',
   height: '546px',
   '& .title': {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '100px',
      '& h4': {
         color: '#000000',
         fontSize: '14px',
         fontWeight: '400',
         paddingBottom: '10px',
      },

      '& .remove': {
         cursor: 'pointer',
         marginRight: '15px',
      },
   },
}))

const StartDate = styled('div')(() => ({
   '& h4': {
      color: '#919191',
      fontSize: '14px',
      fontWeight: '400',
   },
   '& input': {
      color: '#111111',
      width: '120px',
      height: '32px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
   },
   '& .MuiInputBase-input': {
      width: '120px',
      padding: '0 0 0 5px',
      border: 'none',
      height: '34px',
   },
}))

const DueDate = styled('div')(() => ({
   '& .dateWrapper': {
      display: 'flex',
      gap: '10px',
   },
   '& h3': {
      color: '#919191',
      fontSize: '14px',
      fontWeight: '400',
   },
   '& input': {
      color: '#111111',
      width: '120px',
      height: '32px',
      borderRadius: '8px',
      fontWeight: '500',
      fontSize: '14px',
   },
   '& .MuiInputBase-input': {
      width: '120px',
      padding: '0 0 0 5px',
   },
}))

const StyledButton = styled(Button)(() => ({
   width: '244px',
   height: '30px',
   marginLeft: '10px',
}))

const SelectReminder = styled('div')(() => ({
   '& h4': {
      color: '#919191',
      fontSize: '14px',
      fontWeight: '400',
   },
   '& .input': {
      width: '247px',
      height: '32px',
      borderRadius: '8px',
      border: '1px solid D0D0D0',
      marginBottom: '20px',
   },
   '& .control': {
      width: '247px',
      height: '32px',
   },
}))

export default EstimitaionModal
