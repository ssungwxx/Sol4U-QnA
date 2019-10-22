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
    firebase
      .auth()
      .signInAnonymously()
      .then(function() {
        alert("익명 로그인 되었습니다.");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
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

  // 질문 채널 생성
  createChannel(channelCode, channelName, channelDescription, closeTime) {
    var user = firebase.auth().currentUser;

    if (user) {
      const now_timestamp = new Date();

      const channel = {
        channel_code: channelCode,
        channel_name: channelName,
        channel_description: channelDescription,
        is_live: true,
        channel_owner: {
          user_name: user.displayName,
          user_email_verified: user.emailVerified,
          user_email: user.email
        },
        channel_entry: [],
        question: [],
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
        closed_at: {
          timestamp: closeTime,
          string:
            closeTime.getFullYear() +
            "년 " +
            (closeTime.getMonth() + 1) +
            "월 " +
            closeTime.getDate() +
            "일"
        }
      };
      firestore.collection("QnAChannels").add(channel);
    } else {
      console.log("유저 로그인 필쑤");
    }
  },

  // 채널 코드를 통해 질문 채널 가져오기
  async getDocByChannelCode(channelCode) {
    const flag = await this.checkChannelIsLive(channelCode);

    if (flag) {
      const QnAChannel = db.collection("QnAChannels");

      let snapshots = await QnAChannel.where("channel_code", "==", channelCode)
        .get()
        .then(snapshot => {
          return snapshot;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });

      let docId;

      snapshots.forEach(doc => {
        if (doc.data().is_live) {
          docId = doc.id;
        }
      });

      return docId;
    } else {
      return false;
    }
  },

  // 해당되는 질문채널 살아있는지 확인
  async checkChannelIsLive(channelCode) {
    const QnAChannel = db.collection("QnAChannels");

    let snapshots = await QnAChannel.where("channel_code", "==", channelCode)
      .get()
      .then(snapshot => {
        return snapshot;
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    let flag = false;

    snapshots.forEach(doc => {
      if (doc.data().is_live) {
        flag = true;
      }
    });

    return flag;
  },

  // 특정 질문 채널에 질문 추가
  addQuestion(docCode, content) {
    var user = firebase.auth().currentUser;

    if (user) {
      const now_timestamp = new Date();

      const Question = {
        question: content,
        questioner: {
          user_name: user.displayName,
          user_email_verified: user.emailVerified,
          user_email: user.email
        },
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
        .doc(docCode)
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
