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
  async createChannel(channelCode, channelName, channelDescription, closeTime) {
    var user = firebase.auth().currentUser;
    const isLive = await this.checkChannelIsLive(channelCode);

    console.log(isLive);
    if (user.emailVerified && !isLive) {
      const now_timestamp = new Date();

      const channel = {
        channel_code: channelCode,
        channel_name: channelName,
        channel_description: channelDescription,
        is_live: true,
        channel_owner: {
          user_name: user.displayName,
          user_email_verified: user.emailVerified,
          user_email: user.email,
          user_id: user.uid
        },
        channel_entry: [],
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

      await firestore.collection("QnAChannels").add(channel);
      const new_channel = await this.getDocByChannelCode(channelCode);
      console.log(new_channel);

      const userTable = firestore.collection("VerifiedUserTable");

      let snapshots = await userTable
        .where("user_id", "==", user.uid)
        .get()
        .then(snapshot => {
          return snapshot;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });

      let docId;

      snapshots.forEach(doc => {
        docId = doc.id;
      });

      firestore
        .collection("VerifiedUserTable")
        .doc(docId)
        .update({
          owned_channels: firebase.firestore.FieldValue.arrayUnion(new_channel)
        });
    } else if (isLive) {
      alert("채널 코드가 중복되었습니다.");
    } else {
      alert("인증된 로그인이 필요한 작업입니다.");
    }
  },

  // 전체 채널 목록
  async getAllChannels() {
    const QnAChannel = firestore.collection("QnAChannels");

    let channels = [];

    await QnAChannel.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          channels.push(doc.data());
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    console.log(channels);
    return channels;
  },

  // 채널 코드를 통해 Doc 번호 가져오기
  async getDocByChannelCode(channelCode) {
    const flag = await this.checkChannelIsLive(channelCode);

    if (flag) {
      const QnAChannel = firestore.collection("QnAChannels");

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
    const QnAChannel = firestore.collection("QnAChannels");

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
  addQuestion(docId, content) {
    var user = firebase.auth().currentUser;

    if (user) {
      const now_timestamp = new Date();

      const Question = {
        question: content,
        questioner: {
          user_name: user.displayName,
          user_email_verified: user.emailVerified,
          user_email: user.email,
          user_id: user.uid
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
        .doc(docId)
        .collection("Questions")
        .add(Question);
    } else {
      console.log("addQuestion Error");
    }
  },

  // 특정 문서의 모든 질문 가져오기
  async getQuestionsByDocId(docId) {
    const QnAChannel = firestore
      .collection("QnAChannels")
      .doc(docId)
      .collection("Questions");

    let questionsObject = [];

    await QnAChannel.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data();
          data.questionDocId = doc.id;
          questionsObject.push(data);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    console.log(questionsObject);
    return questionsObject;
  },

  // 특정 질문의 하트 수(hit) 증가/감소 (1,-1)
  qustionHit(docId, questionDocId, num) {
    var user = firebase.auth().currentUser;

    if (user) {
      firestore
        .collection("QnAChannels")
        .doc(docId)
        .collection("Questions")
        .doc(questionDocId)
        .update({
          hitCount: firebase.firestore.FieldValue.increment(num)
        });
      console.log("!!");
    } else {
      console.log("Login please");
    }
  },

  // 채널 입장
  async joinTheChannel(channelDocId) {
    var user = firebase.auth().currentUser;

    if (user) {
      const channel = firestore.collection("QnAChannels").doc(channelDocId);
      const userTable = firestore.collection("VerifiedUserTable");

      let channelData = await channel
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            return doc.data();
          }
        })
        .catch(err => {
          console.log("joinTheChannel Method Error", err);
        });

      if (channelData.channel_owner.user_id == user.uid) {
        alert("채널 소유자 입니다");
      } else {
        channelData.channel_entry.forEach(entry => {
          if (entry == user.uid) {
            alert("이미 채널에 참가한 사용자 입니다.");
            return;
          }
        });

        channel.update({
          channel_entry: firebase.firestore.FieldValue.arrayUnion(user.uid)
        });

        let snapshots = await userTable
          .where("user_id", "==", user.uid)
          .get()
          .then(snapshot => {
            return snapshot;
          })
          .catch(err => {
            console.log("Error getting documents", err);
          });

        let userTableDocId;

        snapshots.forEach(doc => {
          userTableDocId = doc.id;
        });

        const userTableDoc = userTable.doc(userTableDocId);

        let joinedChannels = await userTableDoc
          .get()
          .then(doc => {
            if (!doc.exists) {
              console.log("No such document!");
            } else {
              return doc.data();
            }
          })
          .catch(err => {
            console.log("joinTheChannel Method Error", err);
          });

        joinedChannels.joined_channels.forEach(data => {
          if (data == channelDocId) {
            alert("이미 입장한 채널입니다.");
            return;
          }
        });

        userTableDoc.update({
          joined_channels: firebase.firestore.FieldValue.arrayUnion(
            channelDocId
          )
        });
      }
    }
  },

  // 채널 퇴장
  async exitTheChannel(channelDocId) {
    var user = firebase.auth().currentUser;

    if (user) {
      const channel = firestore.collection("QnAChannels").doc(channelDocId);
      const userTable = firestore.collection("VerifiedUserTable");

      let channelData = await channel
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            return doc.data();
          }
        })
        .catch(err => {
          console.log("exitTheChannel Method Error", err);
        });

      channelData.channel_entry.forEach(entry => {
        if (entry == user.uid) {
          channel.update({
            channel_entry: firebase.firestore.FieldValue.arrayRemove(user.uid)
          });
        }
      });

      const snapshots = await userTable
        .where("user_id", "==", user.uid)
        .get()
        .then(snapshot => {
          return snapshot;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });

      let userTableDocId;

      snapshots.forEach(data => {
        userTableDocId = data.id;
      });

      const currentUserTable = userTable.doc(userTableDocId);

      let currentUserTableData = await currentUserTable
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            return doc.data();
          }
        })
        .catch(err => {
          console.log("joinTheChannel Method Error", err);
        });

      currentUserTableData.joined_channels.forEach(data => {
        if (data == channelDocId) {
          currentUserTable.update({
            joined_channels: firebase.firestore.FieldValue.arrayRemove(
              channelDocId
            )
          });
        }
      });
    } else {
      alert("잘못된 접근입니다.");
    }
  },

  // 소유한 채널 삭제 ( 트랙잭션을 사용하여 본래의 컬렉션에서 다른 컬렉션으로 이동시켜 보관 )
  async deleteChannel(channelDocId) {
    const user = firebase.auth().currentUser;

    const qnaChannel = firestore.collection("QnAChannels").doc(channelDocId);

    const channelData = await qnaChannel.get().then(doc => {
      return doc.data();
    });

    if (user && channelData.channel_owner.user_id == user.uid) {
      const deletedChannel = firestore.collection("DeletedChannels");

      deletedChannel.add(channelData);

      qnaChannel.delete();
    } else {
      alert("잘못된 접근입니다.");
    }
  },

  // 질문 삭제
  deleteQuestion() {},

  // 채널 상세 내용 수정
  changChannelDetail() {}
};
