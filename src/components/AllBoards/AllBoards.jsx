import { Box, LinearProgress, styled, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { theme } from '../../assets/styles/theme'
import { useGetAllBoardsQuery } from '../../redux/api/all-boards-api'
import { useToggleMenu } from '../../utils/hooks/useToggleMenu'
import Button from '../UI/Button'
import Cardboards from './Cardboards'
import CreateBoardModal from './CreateBoardModal'
import noBoardsImg from '../../assets/images/noboards.jpg'

const AllBoards = () => {
   const { workspaceId } = useParams()
   const { data, isLoading } = useGetAllBoardsQuery(workspaceId)
   const [allCards, setAllCards] = useState([])
   const { setIsActiveMenu, isActive } = useToggleMenu()

   useEffect(() => {
      if (data) {
         setAllCards(Object.values(data))
      }
   }, [data])

   if (isLoading)
      return (
         <Box sx={{ width: '100%' }}>
            <LinearProgress />
         </Box>
      )

   return (
      <>
         <BlockAllBoards>
            <HeaderBoards>
               <h3>All Boards</h3>
               <StyledButton onClick={() => setIsActiveMenu('createBoard')}>
                  Create new board
               </StyledButton>
            </HeaderBoards>
            {data?.length ? (
               <RenderCards>
                  {allCards?.map((item) => {
                     return (
                        <Cardboards
                           key={item.id}
                           {...item}
                           boardid={workspaceId}
                        />
                     )
                  })}
               </RenderCards>
            ) : (
               <StyledBox>
                  <img
                     className="noBoardsImg"
                     src={noBoardsImg}
                     alt="Empty workspace"
                  />
                  <Typography variant="h5">
                     There is no boards. Please, create a new one
                  </Typography>
               </StyledBox>
            )}
         </BlockAllBoards>
         {isActive === 'createBoard' ? (
            <CreateBoardModal isOpen={isActive} workspaceId={workspaceId} />
         ) : null}
      </>
   )
}

export default AllBoards
const BlockAllBoards = styled('div')(() => ({
   width: '100%',
   margin: ' 25px 25px 40px 0',
   fontFamily: theme.typography.fontFamily,
   padding: 0,
}))
const HeaderBoards = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'space-between',
}))
const StyledButton = styled(Button)(() => ({
   borderRadius: '24px',
   width: '154px',
   height: '34px',
   fontFamily: theme.typography.fontFamily,
}))
const RenderCards = styled('div')(() => ({
   marginTop: '20px',
   display: 'grid',
   gridTemplateColumns: 'repeat(4, 1fr)',
   gridTemplateRows: '1fr',
   gridColumnGap: '10px',
   gridRowGap: '10px',
}))
const StyledBox = styled(Box)(() => ({
   width: '90%',
   height: '100%',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center ',
   alignItems: 'center',
   '.noBoardsImg': {
      width: '500px',
      height: '300px',
   },
}))
