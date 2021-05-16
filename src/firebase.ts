import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFUAi8lFQPGBMF4gLAFX6NIe_9CQlmCHA",
    authDomain: "graphql-demo-834d5.firebaseapp.com",
    databaseURL: "https://graphql-demo-834d5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "graphql-demo-834d5",
    storageBucket: "graphql-demo-834d5.appspot.com",
    messagingSenderId: "282890786445",
    appId: "1:282890786445:web:056e0b878513ac0419f4c4",
    measurementId: "G-LED4E0JY93"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };