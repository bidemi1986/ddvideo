import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCeFZYtvim7iu_ME6r5h796-GNlYxzOya0",
    authDomain: "af-shop.firebaseapp.com",
    databaseURL: "https://af-shop.firebaseio.com",
    projectId: "af-shop",
    storageBucket: "af-shop.appspot.com",
    messagingSenderId: "504098500727",
    appId: "1:504098500727:web:559710f55d728bfc8b9672"
};

firebase.initializeApp(firebaseConfig);
export default  firebase
