import ListIcon from '@mui/icons-material/List'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../utils/constants/routes'

import {
   StyledListItem,
   StyledListItemIcon,
   StyledListItemText,
   StyledListItemButton,
} from './settings'

const AllIssues = ({ open, boardid }) => {
   const navigate = useNavigate()
   return (
      <StyledListItem disablePadding>
         <StyledListItemButton>
            <StyledListItemIcon open={open}>
               <ListIcon />
            </StyledListItemIcon>
            <StyledListItemText
               primary="All issues"
               open={open}
               onClick={() => navigate(`${ROUTES.ISSUES}/${boardid}`)}
            />
         </StyledListItemButton>
      </StyledListItem>
   )
}

export default AllIssues
