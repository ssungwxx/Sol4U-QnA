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
const fireauth = firebase.auth();
const db = firebase.firestore();

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
  logout() {
    return fireauth
      .signOut()
      .then(function() {
        alert("로그아웃 되었습니다.");
      })
      .catch(function(error) {
        return error;
      });
  },

  // Cloud Firebase Database Function
  createChannel(channelCode) {
    var user = firebase.auth().currentUser;

    if (user) {
      const now_timestamp = new Date();

      const channel = {
        channel_code: channelCode,
        channel_owner: {
          user_name: user.displayName,
          user_email_verified: user.emailVerified,
          user_email: user.email
        },
        messages: [],
        created_at: {
          timestamp: now_timestamp,
          string:
            now_timestamp.getFullYear() +
            "년 " +
            (now_timestamp.getMonth() + 1) +
            "월 " +
            now_timestamp.getDate() +
            "일"
        }
      };
      firestore.collection("QnAChannels").add(channel);
    } else {
      console.log("!!");
    }
  },
  addQuestion(channelCode, userId, value) {
    var user = firebase.auth().currentUser;

    if (user) {
      const now_timestamp = new Date();

      const Question = {
        user_id: userId,
        question: value,
        created_at: {
          timestamp: now_timestamp,
          string:
            now_timestamp.getFullYear() +
            "년 " +
            (now_timestamp.getMonth() + 1) +
            "월 " +
            now_timestamp.getDate() +
            "일"
        },
        hitCount: 0
      };

      firestore
        .collection("QnAChannels")
        .doc(channelCode)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion(Question)
        });
    } else {
      console.log("addQuestion Error");
    }
  },
  enterTheChannel(channelCode) {
    const channels = firestore.collection("QnAChannels");
  }
};
