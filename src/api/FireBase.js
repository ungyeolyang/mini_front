import firebase from "firebase/compat/app";
import "firebase/compat/storage";

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
