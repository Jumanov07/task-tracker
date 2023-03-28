import { styled } from '@mui/material/styles'

import {
   Table,
   TableBody,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
} from '@mui/material'

import WorkspaceTableItem, { StyledHeaderTableCell } from './WorkspaceTableItem'
import Button from '../components/UI/Button'

//* это используеться только в одном месте
const HeaderTitle = [
   { title: '№', align: 'left' },
   { title: 'Name', align: 'left' },
   { title: 'Lead', align: 'left' },
   { title: 'Action', align: 'right' },
]
const WorkspaceTable = ({ rows, handleOpenModal }) => {
   return (
      <TableContainer sx={{ paddingTop: '10px' }} component={Paper}>
         <TitleContainer>
            <Title>Workspace</Title>
            <StyledButton onClick={handleOpenModal}>Create</StyledButton>
         </TitleContainer>
         <Table aria-label="customized table">
            <TableHead>
               <TableRow>
                  {HeaderTitle.map((item) => (
                     <StyledHeaderTableCell align={item.align} key={item.title}>
                        {item.title}
                     </StyledHeaderTableCell>
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {rows?.map((row, index) => (
                  <WorkspaceTableItem
                     key={row.id}
                     number={index + 1}
                     {...row}
                  />
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}
export default WorkspaceTable

const StyledButton = styled(Button)(() => ({
   marginTop: '8px',
   width: '100px',
}))

const TitleContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0px 20px',
   alignItems: 'center',
}))

const Title = styled('p')(() => ({
   fontSize: '20px',
   fontWeight: 500,
   color: 'rgba(13, 13, 13, 1)',
}))
