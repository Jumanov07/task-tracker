import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export const firebaseConfig = {
   apiKey: 'AIzaSyB4puGrQwwqjeTh_V-xIlUjTa32mpMWbAA',
   authDomain: 'auth-fe0c1.firebaseapp.com',
   projectId: 'auth-fe0c1',
   storageBucket: 'auth-fe0c1.appspot.com',
   messagingSenderId: '145628870423',
   appId: '1:145628870423:web:79251df4b21a09ce152952',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export default app
