/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useEffect } from 'react'

import { useTheme } from '@mui/material/styles'

import {
   Box,
   List,
   styled,
   Avatar,
   Divider,
   Collapse,
   IconButton,
   ListItemText,
   Drawer as MuiDrawer,
   Typography,
} from '@mui/material'

import { useDispatch } from 'react-redux'
import {
   FormatAlignLeft,
   FormatAlignRight,
   KeyboardArrowLeft,
   PeopleAlt as PeopleAltIcon,
} from '@mui/icons-material'
import ListIcon from '@mui/icons-material/List'

import { useNavigate } from 'react-router-dom'
import Boards from '../components/Sidebar/boards'
import Workspaces from '../components/Sidebar/workspace'
import SidebarListItem from '../components/Sidebar/SidebarListItem'

import Setting, {
   StyledListItem,
   StyledListItemIcon,
   StyledListItemText,
   StyledListItemButton,
} from '../components/Sidebar/settings'

import { ROUTES } from '../utils/constants/routes'
import { useGetSingleWorkspaceQuery } from '../redux/api/workspace-api'
import { useGetAllBoardsQuery } from '../redux/api/all-boards-api'
import { changeWidthActions } from '../redux/slice/changeWidthColumns'

const BoardTitle = [
   {
      text: 'According',
      id: 1,
      openSuboard: null,
      subBoards: [{ id: '1' }],
   },
   { text: 'LMS', id: 2, openSuboard: null, subBoards: [{ id: '3' }] },
   { text: 'Wokrspace', id: 3, openSuboard: null, subBoards: [{ id: '2' }] },
]

export default function Sidebar({ boardid }) {
   const theme = useTheme()
   const navigate = useNavigate()

   const { data: workspace } = useGetSingleWorkspaceQuery(boardid)
   const { data: allBoards } = useGetAllBoardsQuery(boardid)

   const [open, setOpen] = useState(false)

   const [isOpen, setIsOpen] = useState(false)

   const [boards, setBoards] = useState(BoardTitle)

   const [idFromArray, setIdFromArray] = useState(null)
   const dispatch = useDispatch()

   const handleDrawerOpen = () => {
      theme.direction = 'rtl'
      setOpen(true)
      dispatch(changeWidthActions.changeWidth('rtl'))
   }
   useEffect(() => {
      theme.direction = 'ltr  '
   }, [])
   const handleCollapseOpen = () => {
      setIsOpen((prev) => !prev)
   }

   const handleDrawerClose = () => {
      theme.direction = 'ltr'
      setOpen(false)
      setIsOpen(false)
      dispatch(changeWidthActions.changeWidth('ltr'))
   }

   const handleNavigate = (id) => {
      navigate(`/boards/${boardid}/${id}`)
   }

   const openSingeList = (boardId) => {
      const findById = boards.map((board) => {
         return board.id === boardId
            ? { ...board, openSuboard: boardId }
            : board
      })
      setBoards(findById)
      setIdFromArray(boardId)
   }

   const directionIconButton = useCallback(
      () =>
         theme.direction === 'rtl' ? (
            <StyledIconButton onClick={handleDrawerClose}>
               <FormatAlignRight />
            </StyledIconButton>
         ) : (
            <StyledIconButton onClick={handleDrawerOpen}>
               <FormatAlignLeft />
            </StyledIconButton>
         ),
      [theme.direction]
   )

   const toggleIconAndAvatarIcon = useCallback(() => {
      return open ? (
         <StyledListItemIcon open={open}>
            <KeyboardArrowLeft />
         </StyledListItemIcon>
      ) : (
         <StyledHeaderAvatar src={workspace?.leadPhoto} alt="TASK TRACKER" />
      )
   }, [open])
   return (
      <StyledBox>
         <Drawer classes={{ paper: 'paper' }} variant="permanent" open={open}>
            <DrawerHeader>
               <StyledListItem disablePadding open={open}>
                  <StyledListItemButton>
                     {toggleIconAndAvatarIcon()}
                     <StyledListItemText
                        primary={
                           <Typography
                              noWrap
                              sx={{
                                 maxWidth: '150px',
                                 fontWeight: '600',
                                 textTransform: 'Uppercase',
                              }}
                           >
                              {workspace?.name}
                           </Typography>
                        }
                        onClick={() => {
                           navigate(`${ROUTES.BOARDS}/${boardid}`)
                        }}
                        open={open}
                     />
                  </StyledListItemButton>
               </StyledListItem>
            </DrawerHeader>
            <StyledDivider />

            <List>
               <Boards
                  open={open}
                  isOpen={isOpen}
                  handleOpen={handleCollapseOpen}
               >
                  {allBoards?.map((item) => {
                     return (
                        <Collapse in={isOpen} key={item.id}>
                           <StyledList>
                              <ListItemText
                                 onClick={() => handleNavigate(item.id)}
                                 primary={item.name}
                              />
                           </StyledList>
                        </Collapse>
                     )
                  })}
               </Boards>
            </List>
            <StyledDivider />
            <List>
               <StyledListItemButton>
                  <StyledListItemIcon open={open}>
                     <ListIcon />
                  </StyledListItemIcon>
                  <StyledListItemText
                     primary="All issues"
                     open={open}
                     onClick={() => {
                        navigate(`${ROUTES.ISSUES}/${boardid}`)
                        theme.direction = 'rtl'
                     }}
                  />
               </StyledListItemButton>
               <Setting open={open} />
               <StyledListItemButton sx={{ display: 'flex', gap: '10px' }}>
                  <PeopleAltIcon sx={{ opacity: 0.5 }} />
                  <StyledListItemText
                     primary="Participants"
                     open={open}
                     onClick={() => {
                        navigate(`${ROUTES.PARTICIPANTS}/${boardid}`)
                        theme.direction = 'rtl'
                     }}
                  />
               </StyledListItemButton>
            </List>
            <StyledDivider />
            <Workspaces open={open} />
            {boards.map((item) => {
               return (
                  <SidebarListItem
                     {...item}
                     open={open}
                     key={item.id}
                     idFromArray={idFromArray}
                     openSingeList={openSingeList}
                     setIdFromArray={setIdFromArray}
                  >
                     <StyledAvatar src="/" alt={item.text} />
                  </SidebarListItem>
               )
            })}
         </Drawer>
         <DrawerHeader>{directionIconButton()}</DrawerHeader>
      </StyledBox>
   )
}

const openedMixin = (theme) => ({
   width: 240,
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: 'hidden',
})

const closedMixin = (theme) => ({
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: 'hidden',
   [theme.breakpoints.up('sm')]: {
      width: '80px',
   },
})

const StyledBox = styled(Box)(() => ({
   display: 'flex',
}))

const DrawerHeader = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-end',
   ...theme.mixins.toolbar,
   border: 'none',
   alignSelf: 'flex-start',
}))

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
   width: 450,
   flexShrink: 0,
   whiteSpace: 'nowrap',
   boxSizing: 'border-box',
   ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
      '& .MuiDrawer-paper ': {
         border: 'none',
         opacity: 0.6,
         paddingRight: '12px',
         position: 'static',
      },
   }),
   ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
      '& .MuiDrawer-paper ': {
         border: 'none',
         opacity: 0.6,
         position: 'static',
         paddingRight: '6px',
      },
   }),
}))

const StyledList = styled(List)(() => ({
   padding: '0',
   margin: '0',
   paddingLeft: '100px',
   boxSizing: 'border-box',
   display: 'flex',
   alignItems: 'flex-start',
   flexDirection: 'column',
   cursor: 'pointer',
}))

const StyledDivider = styled(Divider)(() => ({
   marginLeft: '10px',
   marginRight: '10px',
}))

const StyledAvatar = styled(Avatar)(() => ({
   width: '25px',
   height: '25px',
   background: 'green',
   fontSize: '16px',
}))

const StyledIconButton = styled(IconButton)(() => ({
   background: '#fff',
   position: 'relative',
   transform: 'translateX(-30%)',
   borderRadius: '12px',
   zIndex: 0,
   '&:hover': {
      background: '#fff',
   },
}))

const StyledHeaderAvatar = styled(StyledAvatar)(() => ({
   backgroundColor: '#0079BF',
   color: '#FFFFFF',
}))
