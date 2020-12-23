import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyAzppXE9LZ5jgrH-hHKYjNEQftUVA0kvLA",
  authDomain: "todo-e6686.firebaseapp.com",
  databaseURL: "https://todo-e6686-default-rtdb.firebaseio.com",
  projectId: "todo-e6686",
  storageBucket: "todo-e6686.appspot.com",
  messagingSenderId: "566273836855",
  appId: "1:566273836855:web:8a13e5edb1e774687bfcb2",
  measurementId: "G-PNMWTLPKDE"
}

const firebaseApp = firebase.initializeApp(config)