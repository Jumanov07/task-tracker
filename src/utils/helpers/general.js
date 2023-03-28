import { persistor } from '../../redux'

export const loggedOut = () => {
   persistor.purge()
}
