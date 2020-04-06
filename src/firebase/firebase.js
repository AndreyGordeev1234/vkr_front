import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDlXNhGBbTpw2_Rwqy3ytZm7obxQ4SivK0",
    authDomain: "eapml-app.firebaseapp.com",
    databaseURL: "https://eapml-app.firebaseio.com",
    projectId: "eapml-app",
    storageBucket: "eapml-app.appspot.com",
    messagingSenderId: "925970987866",
    appId: "1:925970987866:web:41faf05439bbbb45969163"
}

const myFirebase = firebase.initializeApp(firebaseConfig)
export default myFirebase