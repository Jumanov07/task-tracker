import React from 'react'
import { useParams } from 'react-router'
import AllIssuesTable from './AllIssuesTable'

const AllIssues = () => {
   const { workspaceId } = useParams()
   return <AllIssuesTable workspaceId={workspaceId} />
}

export default AllIssues
