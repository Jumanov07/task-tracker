import {
   Box,
   FormControl,
   InputBase,
   ListItemText,
   MenuItem,
   Paper,
   Select,
   styled,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
} from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ISSUES_HEADER } from '../../utils/constants'
import {
   useGetAllIssuesQuery,
   useGetAllLabelsQuery,
   useGetAllParticipantsQuery,
} from '../../redux/api/all-issues-api'
import AllIssuesTableItem from './AllIssuesTableItem'
import CheckBox from '../UI/CheckBox'

const AllIssuesTable = ({ workspaceId }) => {
   const [firstDate, setFirstDate] = useState('')
   const [secondDate, setSecondDate] = useState('')
   const [selectedLabel, setSelectedLabel] = useState(false)
   const [selectedParticipant, setSelectedParticipant] = useState(false)
   const { columnWidth } = useSelector((state) => state.changeWidthColumns)
   const [chekhandle, setChekHandle] = useState(false)

   const paramsCreatorHandler = () => {
      if (!firstDate && !secondDate && !selectedLabel && !selectedParticipant) {
         return {
            isFilter: false,
         }
      }
      const filterParams = {
         isFilter: true,
      }

      if (firstDate && secondDate) {
         filterParams.from = firstDate
         filterParams.to = secondDate
      }
      if (selectedLabel) {
         filterParams.labelId = selectedLabel
      }
      if (selectedParticipant) {
         filterParams.memberId = selectedParticipant
      }
      return filterParams
   }

   const { data } = useGetAllIssuesQuery({
      workspaceId,
      params: paramsCreatorHandler(),
   })

   const { data: allLabels } = useGetAllLabelsQuery()
   const { data: participants } = useGetAllParticipantsQuery(workspaceId)
   const handleSelectLabel = (e) => {
      setSelectedLabel(e.target.value)
   }
   const handleSelectParticipant = (value) => {
      if (value) {
         setChekHandle((prev) => !prev)
         setSelectedParticipant(value)
      }
   }

   return (
      <StyledTableContainer component={Paper} columnwidth={columnWidth}>
         <ToolsBox>
            <ListItemText
               primary={<Typography variant="h5">View all issues</Typography>}
               secondary={
                  <Typography>
                     Total : <span>{data?.allIssuesResponses?.length}</span>
                  </Typography>
               }
            />
            <FilterTools>
               <StyledFormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputBase
                     type="date"
                     value={firstDate}
                     onChange={(e) => setFirstDate(e.target.value)}
                  />
               </StyledFormControl>
               <StyledFormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputBase
                     type="date"
                     value={secondDate}
                     onChange={(e) => setSecondDate(e.target.value)}
                  />
               </StyledFormControl>

               <StyledSelect onChange={handleSelectLabel} value={selectedLabel}>
                  <MenuItem value={false}>
                     <em>All labels</em>
                  </MenuItem>
                  {allLabels?.map((label) => {
                     return (
                        <StyledMenuItem key={label.id} value={label.id}>
                           <Label color={label.color} />
                        </StyledMenuItem>
                     )
                  })}
               </StyledSelect>

               <StyledSelect
                  value={selectedParticipant}
                  onChange={handleSelectParticipant}
               >
                  <MenuItem value={false}>
                     <em>No Participants</em>
                  </MenuItem>
                  {participants?.map((participant) => (
                     <ParticipantsMenuItem key={participant.id}>
                        <CheckBox
                           checked={chekhandle}
                           onChange={() =>
                              handleSelectParticipant(participant.id)
                           }
                        />
                        <ListItemText
                           primary={`${participant.name} ${participant.surname}`}
                           secondary={` email: ${participant.email}`}
                        />
                     </ParticipantsMenuItem>
                  ))}
               </StyledSelect>
            </FilterTools>
         </ToolsBox>
         <Table>
            <TableHead>
               <TableRow>
                  {ISSUES_HEADER.map((issue) => (
                     <TableCell key={issue.id} align={issue.align}>
                        <Typography variant="subtitle1">
                           {issue.title}
                        </Typography>
                     </TableCell>
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {data?.allIssuesResponses?.map((issue) => (
                  <AllIssuesTableItem key={issue.id} {...issue} />
               ))}
            </TableBody>
         </Table>
      </StyledTableContainer>
   )
}

export default AllIssuesTable

const StyledTableContainer = styled(TableContainer)(({ columnwidth }) => ({
   width: columnwidth ? '75vw' : '84vw',
   height: '500px',
   margin: '16px 30px',
   borderRadius: '8px',

   '& .MuiTableCell-body': {
      width: '65px',
   },
}))

const ToolsBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '50px',
   padding: '10px',
}))

const FilterTools = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'space-around',
   alignItems: 'center',
   gap: '40px',
}))

const StyledMenuItem = styled(MenuItem)(() => ({
   gap: '10px',
}))

const Label = styled('div')(({ color }) => ({
   backgroundImage: `url(${color})`,
   width: '70px',
   height: '15px',
   borderRadius: '8px',
}))
const StyledSelect = styled(Select)(() => ({
   width: '150px',
   height: '36px',
   borderRadius: '5px',
   fontWeight: '600',
}))
const StyledFormControl = styled(FormControl)(() => ({
   border: '1px solid gray',
   borderRadius: '5px',
   padding: '3px',
   margin: '0',
   '&.MuiFormControl-root': {
      paddingTop: 0,
   },
}))

const ParticipantsMenuItem = styled(MenuItem)(() => ({
   display: 'flex',
   gap: '15px',
}))
