import React, { useState } from 'react'

import { toast } from 'react-toastify'
import { Box, styled } from '@mui/material'
import WorkspaceTable from '../layout/WorkspaceTable'
import 'react-toastify/dist/ReactToastify.css'
import CreateNewWorkSpace from '../components/CreateNewWorkSpace'
import { useGetAllWorkspacesQuery } from '../redux/api/workspace-api'

const WorkspacePage = () => {
   const [isOpenModal, setIsOpenModal] = useState(false)

   const handleOpenModal = () => {
      setIsOpenModal((prev) => !prev)
   }
   const {
      isLoading,
      data: allWorkspaces,
      isError,
      error,
   } = useGetAllWorkspacesQuery(undefined, { refetchOnMountOrArgChange: true })

   if (isLoading) {
      toast.loading('Loading...', {
         position: toast.POSITION.TOP_RIGHT,
         toastId: 'loading-notification',
      })
   } else {
      toast.dismiss('loading-notification')
   }

   if (isError) {
      toast.error(
         `Some error occured : ${error.status}. Please, reload the page`,
         {
            position: toast.POSITION.TOP_RIGHT,
         }
      )
   }

   return (
      <>
         <TableWrapper>
            <WorkspaceTable
               rows={allWorkspaces}
               handleOpenModal={handleOpenModal}
            />
         </TableWrapper>
         <CreateNewWorkSpace open={isOpenModal} handleMove={handleOpenModal} />
      </>
   )
}
export default WorkspacePage

const TableWrapper = styled(Box)(() => ({
   width: '100%',
   height: '90vh',
   background: '#f8f8f8',
   padding: '20px 25px',
}))
