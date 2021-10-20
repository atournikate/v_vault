import firebase from "firebase/app";
import "firebase/firestore";
// import "firebase/auth";
// import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZup3SSZV7CaBvRa6Gn5bZ9L6EvpFSXCc",
  authDomain: "valtech-vault-ba092.firebaseapp.com",
  projectId: "valtech-vault-ba092",
  storageBucket: "valtech-vault-ba092.appspot.com",
  messagingSenderId: "525349614190",
  appId: "1:525349614190:web:82b7a54e82d3d7a9ccac7f",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
//this connects the frontend to our Firebase backend
