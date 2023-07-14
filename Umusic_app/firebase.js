// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNZZWTBhnUCDKWzrf2_do7TZWto3O92rE",
  authDomain: "umusic-f1dc1.firebaseapp.com",
  projectId: "umusic-f1dc1",
  storageBucket: "umusic-f1dc1.appspot.com",
  messagingSenderId: "231908548628",
  appId: "1:231908548628:web:0923e386515574c1124701",
  databaseURL: 'https://umusic-f1dc1-default-rtdb.firebaseio.com/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth(app);

export { auth, database };