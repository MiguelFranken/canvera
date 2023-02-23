import { initializeApp } from 'firebase/app'
import { VueFire, VueFireAuth } from 'vuefire'
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

export const install: UserModule = ({ app }) => {
  const firebaseApp = initializeApp(firebaseConfig)

  app.use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  })
}
