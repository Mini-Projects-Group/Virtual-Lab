import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7UKruXDGR5FGAE5E45Ncsn203ZjCgAiA",
  authDomain: "virtual-lab-storage.firebaseapp.com",
  projectId: "virtual-lab-storage",
  storageBucket: "virtual-lab-storage.appspot.com",
  messagingSenderId: "226623364946",
  appId: "1:226623364946:web:0bbbcb50c9fa9074c7248b",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
