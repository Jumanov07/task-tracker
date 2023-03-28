import { useSearchParams } from 'react-router-dom'

export const useToggleMenu = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const setIsActiveMenu = (menu, board, card) => {
      if (board !== undefined) {
         setSearchParams({ menu, board })
      }

      if (card !== undefined) {
         setSearchParams({ menu, board, card })
      }
      if (board === undefined && card === undefined) {
         setSearchParams({ menu })
      }
   }

   const onCloseMenu = () => {
      setSearchParams({})
   }

   const isActive = searchParams.get('menu')
   const board = searchParams.get('board')
   const card = searchParams.get('card')

   return {
      isActive,
      setIsActiveMenu,
      onCloseMenu,
      board,
      card,
   }
}
