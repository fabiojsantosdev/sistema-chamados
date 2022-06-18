import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


let firebaseConfig = {
    apiKey: "AIzaSyCc40tBSRfCyrpX_al_Qn58PB7x5fjjwkk",
    authDomain: "sistema-c2159.firebaseapp.com",
    projectId: "sistema-c2159",
    storageBucket: "sistema-c2159.appspot.com",
    messagingSenderId: "716038467124",
    appId: "1:716038467124:web:b62a1e27a870788d9d6461",
    measurementId: "G-0TWK3NCF92"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
    

export default firebase;