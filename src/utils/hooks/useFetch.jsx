import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const useFetch = () => {
   const requestStatus = (data, error) => {
      if (error) {
         toast.error(error.data.message, {
            toastId: 'error-notification',
         })
      } else if (data) {
         toast.success(data.isSuccess.message, {
            toastId: 'success-notification',
         })
      }
   }

   useEffect(() => {
      requestStatus()
   }, [requestStatus])

   return {
      requestStatus,
   }
}
