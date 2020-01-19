import firebase from "firebase"


var firebaseConfig = {
    apiKey: "AIzaSyAscgoXoqL2LOk84LfNxq1BCu-JnFwyNug",
    authDomain: "geekstat-v.firebaseapp.com",
    databaseURL: "https://geekstat-v.firebaseio.com",
    projectId: "geekstat-v",
    storageBucket: "geekstat-v.appspot.com",
    messagingSenderId: "748797302864",
    appId: "1:748797302864:web:1f23f4bb7d8b8698461955"
};

firebase.initializeApp(firebaseConfig);

export default firebase;