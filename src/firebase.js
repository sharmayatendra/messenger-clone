import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB3ue6NT1pQ8WKRkzfM3ypAZJGU2AqJIX4",
    authDomain: "chit-chat-28bb8.firebaseapp.com",
    projectId: "chit-chat-28bb8",
    storageBucket: "chit-chat-28bb8.appspot.com",
    messagingSenderId: "743021536462",
    appId: "1:743021536462:web:47b69b40bbe70107dddc9f"
  });

  const db = firebaseApp.firestore();

  export default db;
  