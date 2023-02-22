// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD6gzpkpZCUWxqnxpVg_h2c_XunPn_Rpk0',
  authDomain: 'canvera-6a73a.firebaseapp.com',
  projectId: 'canvera-6a73a',
  storageBucket: 'canvera-6a73a.appspot.com',
  messagingSenderId: '186531151217',
  appId: '1:186531151217:web:36411c660228cf04664ad0',
  measurementId: 'G-B6MFK7F4YE',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

console.log('firebaseApp', firebaseApp)
// const analytics = getAnalytics(firebaseApp)
