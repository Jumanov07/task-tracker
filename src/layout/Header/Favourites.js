import { useState, useMemo } from 'react'
import { styled, Menu } from '@mui/material'

import { useNavigate, useParams } from 'react-router'
import { Arrows, FilledStar } from '../../assets/icons'
import {
   useGetfavouritesQuery,
   useFavouritesIdMutation,
   useWorkSpaceIdMutation,
} from '../../redux/api/favourites-api'

const Favourites = () => {
   const [anchorEl, setAnchorEl] = useState(null)

   const { data } = useGetfavouritesQuery()
   const [favouritesId] = useFavouritesIdMutation()
   const [workSpaceId] = useWorkSpaceIdMutation()
   const navigate = useNavigate()
   const { workspaceId: wId } = useParams()
   const boardFavourite = data?.board
   const workspaceFavourite = data?.workspace

   const favouriteCount =
      boardFavourite || workspaceFavourite
         ? boardFavourite.length + workspaceFavourite.length
         : null

   const handleMenu = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   const addBoardId = (id) => {
      favouritesId(id)
   }

   const addWorkspaceId = (id) => {
      workSpaceId(id)
   }
   const navigateFavorite = (id) => {
      navigate(`/boards/${wId}/${id}`)
      setAnchorEl(null)
   }
   const memoziedFavouritesList = useMemo(() => {
      return (
         <FavouritesMenuWrapper>
            {boardFavourite?.length !== 0 ||
            workspaceFavourite?.length !== 0 ? (
               <>
                  <h3>Favourites</h3>
                  {boardFavourite?.map((item) => (
                     <FavouritesMiniWrapper key={item.id}>
                        <ImgAndTitleWrapper>
                           <ImgFavouritesWrapper
                              onClick={() => navigateFavorite(item.boardId)}
                              src={item.photoLinkBoard}
                              alt="img favourites"
                           />
                           <div>
                              <p className="title">{item.boardName}</p>
                              <p className="board">Board</p>
                           </div>
                        </ImgAndTitleWrapper>
                        <FilledStar
                           className="fieldstar"
                           onClick={() => addBoardId(item.boardId)}
                        />
                     </FavouritesMiniWrapper>
                  ))}
                  {workspaceFavourite?.map((item) => (
                     <FavouritesMiniWrapper key={item.id}>
                        <ImgAndTitleWrapper>
                           <div>
                              <p className="title">{item.workspaceName}</p>
                              <p className="board">Workspace</p>
                           </div>
                        </ImgAndTitleWrapper>
                        <FilledStar
                           className="fieldstar"
                           onClick={() => addWorkspaceId(item.workspaceId)}
                        />
                     </FavouritesMiniWrapper>
                  ))}
               </>
            ) : (
               <h3>There is nothing in favorites 🥲</h3>
            )}
         </FavouritesMenuWrapper>
      )
   }, [boardFavourite, workspaceFavourite])

   return (
      <div>
         <StyledFavor onClick={handleMenu}>
            <h4>
               Favourites <span>({favouriteCount})</span>
            </h4>
            <Arrows className="arrow" />
         </StyledFavor>
         <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
         >
            {memoziedFavouritesList}
         </Menu>
      </div>
   )
}

export default Favourites

const StyledFavor = styled('div')(() => ({
   display: 'flex',
   width: '140px',
   gap: '8px',
   cursor: 'pointer',

   '& h4': {
      fontSize: '16px',
      fontWeight: '600',
      color: '#3E3E3E',
   },
}))

const FavouritesMenuWrapper = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   width: '353px',
   maxHeight: '430px',
   borderRadius: 'design',
   padding: '0px 18px 0px 16px',

   '& h3': {
      margin: '0 auto',
      paddingTop: '10px',
      color: '#000000',
      fontSize: '16px',
      fontWeight: '400',
   },
}))

const FavouritesMiniWrapper = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   marginTop: '15px',

   '& .fieldstar': {
      marginTop: '3px',
      width: '17px',
      height: '17px',
      cursor: 'pointer',
   },
}))

const ImgFavouritesWrapper = styled('img')(() => ({
   width: '84px',
   height: '40px',
   borderRadius: '8px',
}))

const ImgAndTitleWrapper = styled('div')(() => ({
   display: 'flex',
   height: '42px',
   gap: '10px',

   '& .board': {
      color: '#919191',
      fontSize: '14px',
      fontWeight: '400',
   },

   '& .title': {
      color: '#000000',
      fontSize: '16px',
      fontWeight: '400',
      width: '100px',
   },
}))
