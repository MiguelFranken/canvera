import { initializeApp } from 'firebase/app'
import { VueFire, VueFireAuth, useSSRInitialState } from 'vuefire'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { type UserModule } from '~/types'

const firebaseConfig = {
  apiKey: 'AIzaSyD6gzpkpZCUWxqnxpVg_h2c_XunPn_Rpk0',
  authDomain: 'canvera-6a73a.firebaseapp.com',
  projectId: 'canvera-6a73a',
  storageBucket: 'canvera-6a73a.appspot.com',
  messagingSenderId: '186531151217',
  appId: '1:186531151217:web:36411c660228cf04664ad0',
  measurementId: 'G-B6MFK7F4YE',
}

export const install: UserModule = ({ app, isClient, initialState }) => {
  const firebaseApp = initializeApp(firebaseConfig)

  if (isClient) {
    // reuse the initial state on the client
    useSSRInitialState(initialState.vuefire, firebaseApp)
  }
  else {
    // on the server we ensure all the data is retrieved in this object
    initialState.vuefire = useSSRInitialState(
      // let `useSSRInitialState` create the initial object for us
      undefined,
      // this is necessary to work with concurrent requests
      firebaseApp,
    )
  }

  const db = getFirestore()
  connectFirestoreEmulator(db, 'localhost', 8080)

  const auth = getAuth()
  connectAuthEmulator(auth, 'http://localhost:9099')

  app.use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  })
}
