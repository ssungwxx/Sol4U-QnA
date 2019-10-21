import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// Setup Firebase
const config = {
  apiKey: "AIzaSyCRq_nISqiR-itSoaVPS8KyrxiEdalKddo",
  authDomain: "ssafyfinal.firebaseapp.com",
  databaseURL: "https://ssafyfinal.firebaseio.com",
  projectId: "ssafyfinal",
  storageBucket: "ssafyfinal.appspot.com",
  messagingSenderId: "752151326570",
  appId: "1:752151326570:web:d4d773f1ea0237a4273f13",
  measurementId: "G-ZE1GDYK77V"
};

firebase.initializeApp(config);

const firestore = firebase.firestore();
const database = firebase.database();

export default {
  // Login Function
  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        let accessToken = result.credential.accessToken;
        let user = result.user;
        return result;
      })
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(
          "errorCode : " + errorCode + "\n errorMessage : " + errorMessage
        );
      });
  },
  loginWithAnonymous() {
    return firebase
      .auth(function() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // 로그인
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
          } else {
            // 로그아웃
          }
        });
      })
      .signInAnonymously()
      .then()
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(
          "errorCode : " + errorCode + "\n errorMessage : " + errorMessage
        );
      });
  },

  // Realtime Database Function
  createChatServer() {},
  connectChatServer() {}
};
