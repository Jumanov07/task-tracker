import {
   Avatar,
   AvatarGroup,
   styled,
   TableCell,
   Typography,
} from '@mui/material'
import React from 'react'
import { StyledTableRow } from '../../layout/WorkspaceTableItem'

const AllIssuesTableItem = ({
   created,
   period,
   creatorName,
   creatorSurname,
   columnName,
   cardMemberResponses,
   checklist,
   description,
   labelResponses,
}) => {
   return (
      <StyledTableRow>
         <TableCell>
            <StyledTypography variant="body2">{created}</StyledTypography>
         </TableCell>
         <TableCell>
            <StyledTypography>{period} days</StyledTypography>
         </TableCell>
         <TableCell>
            <StyledTypography variant="body2">{creatorName}</StyledTypography>
            <StyledTypography variant="body2">
               {creatorSurname}
            </StyledTypography>
         </TableCell>
         <TableCell>
            <StyledTypography variant="body2">{columnName}</StyledTypography>
         </TableCell>
         <TableCell align="left">
            <AvatarGroup max={3}>
               {cardMemberResponses.map((response) => (
                  <Avatar
                     key={response.id}
                     src={response.photoLink}
                     alt={response.creatorName}
                  />
               ))}
            </AvatarGroup>
         </TableCell>
         <LabelsTableCell>
            {labelResponses
               ? labelResponses.map((label) => (
                    <StyledColor key={label.id} color={label.color} />
                 ))
               : null}
         </LabelsTableCell>
         <TableCell>
            <StyledTypography variant="body2">{checklist}</StyledTypography>
         </TableCell>
         <TableCell>
            <StyledTypography variant="body2">{description}</StyledTypography>
         </TableCell>
      </StyledTableRow>
   )
}

export default AllIssuesTableItem

const StyledTypography = styled(Typography)(() => ({
   fontSize: '16px',
   alignItems: 'flex-start',
   ':nth-of-type(1)': {
      width: '100px',
   },
}))
const LabelsTableCell = styled(TableCell)(() => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(2, 1fr)',
   gridTemplateRows: 'repeat(5, 1fr)',
   gridColumnGap: '6px',
   gridRowGap: '6px',
}))

export const StyledColor = styled('div')(({ color }) => ({
   display: 'grid',
   gridTemplateColumns: '1fr 1fr',
   width: '46px',
   height: '7px',
   borderRadius: '8px',
   border: 'none',
   backgroundImage: `url(${color})`,
}))
