import firebase from "firebase";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAWWsk0aaIHc_EaUzpa2wlpzcEoRwWiNSE",
    authDomain: "afdoctordial.firebaseapp.com",
    databaseURL: "https://afdoctordial.firebaseio.com",
    projectId: "afdoctordial",
    storageBucket: "afdoctordial.appspot.com",
    messagingSenderId: "404052587115",
    appId: "1:404052587115:web:40653bffaeaac07b13772e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default  firebase