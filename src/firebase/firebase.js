import firebase from "firebase";
import "firebase/storage";
const firebaseDevelopment = {
  apiKey: "AIzaSyAkSvTIPZ9WtlGgnB4HeStCopG7owTA_ow",
  authDomain: "track-my-order-6e44b.firebaseapp.com",
  projectId: "track-my-order-6e44b",
  storageBucket: "track-my-order-6e44b.appspot.com",
  messagingSenderId: "711936100221",
  appId: "1:711936100221:web:9b8b2b25e9cbb5ad0cee14",
  measurementId: "G-1S8H7DGLX0"
};


// Initialize Firebase
var fireDb = firebase.initializeApp(
  firebaseDevelopment
  // firebaseDevelopment
);

firebase.analytics();
const db = firebase.firestore();
// const db = firebase.firestore();

const storage = firebase.storage();
const dbStorage = fireDb.database().ref();
export { storage, db, dbStorage, firebase };
