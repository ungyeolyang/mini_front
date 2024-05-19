import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8DNJf_RV7nfol036wDX6mUKGGcvvStBQ",
  authDomain: "test-project-37d9c.firebaseapp.com",
  projectId: "test-project-37d9c",
  storageBucket: "test-project-37d9c.appspot.com",
  messagingSenderId: "576353663649",
  appId: "1:576353663649:web:81dcd2c798a407d596cee0",
  measurementId: "G-808RVCHMKF",
};

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
