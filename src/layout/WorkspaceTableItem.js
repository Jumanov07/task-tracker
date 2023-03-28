import styled from '@emotion/styled'
import { tableCellClasses } from '@mui/material/TableCell'
import { TableCell, TableRow, Avatar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useAddFavoriteWorkspaceMutation } from '../redux/api/workspace-api'
import StarCheckbox from '../components/UI/StarCheckbox'
import { ROUTES } from '../utils/constants/routes'

const WorkspaceTableItem = ({
   number,
   name,
   leadPhotoLink,
   leadName,
   favourite,
   id,
}) => {
   const [addFavoriteWorkspace] = useAddFavoriteWorkspaceMutation()

   const addFavoriteWorkspaceHandler = async (favoriteId) => {
      await addFavoriteWorkspace(favoriteId)
   }
   return (
      <StyledTableRow>
         <StyledHeaderTableCell>{number}</StyledHeaderTableCell>
         <StyledTableCell color="rgba(0, 115, 222, 1)" width="50%">
            <StyledLink to={`${ROUTES.BOARDS}/${id}`}>{name}</StyledLink>
         </StyledTableCell>
         <StyledTableCell alignitems="center" display="flex">
            <StyledAvatar src={leadPhotoLink} />
            {leadName}
         </StyledTableCell>
         <StyledTableCell align="right">
            <StarCheckbox
               checked={favourite}
               onChange={() => addFavoriteWorkspaceHandler(id)}
            />
         </StyledTableCell>
      </StyledTableRow>
   )
}

export default WorkspaceTableItem

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
   width: '100%',
   border: 'none',
   '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
   },
   '&:last-child td, &:last-child th': {
      border: 'none',
   },
}))

const StyledTableCell = styled(TableCell)(
   ({ width, color, alignitems, display }) => ({
      display: display || '',
      width: width || '',
      color: color || 'rgba(0, 0, 0, 1)',
      alignItems: alignitems || '',
      [`&.${tableCellClasses.head}`]: {
         padding: '10px 20px 5px 20px',
      },
      [`&.${tableCellClasses.body}`]: {
         fontSize: 16,
         border: 'none',
         padding: '20px 20px',
      },
   })
)

const StyledAvatar = styled(Avatar)(() => ({
   display: 'inline-flex',
   marginRight: '8px',
}))

export const StyledHeaderTableCell = styled(TableCell)(() => ({
   fontWeight: 500,
}))

const StyledLink = styled(NavLink)(() => ({
   color: '#0073de',
   '&:active': {
      color: 'black',
   },
}))
