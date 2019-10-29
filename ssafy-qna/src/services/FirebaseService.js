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

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default {
  // Vue 내부에서 사용용도
  firebase,
  firestore,
  // 구글 로그인
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

  // 익명 로그인
  async loginWithAnonymous() {
    await firebase
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

  // 익명 로그인이 아니라면 VerifiedUserTable테이블 생성
  async createVerifiedUserTable() {
    const user = firebase.auth().currentUser;

    if (!user.isAnonymous) {
      const userTalbe = firestore.collection("VerifiedUserTable");

      let flag = false;

      await userTalbe.get().then(docs => {
        docs.forEach(doc => {
          if (doc.data().user_id == user.uid) {
            flag = true;
          }
        });
      });

      if (flag) {
        return;
      } else {
        const userInfo = {
          user_id: user.uid,
          joinned_channels: [],
          owned_channels: []
        };

        userTalbe.add(userInfo);
      }
    }
  },

  // 로그아웃
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

  // 현재 로그인한 정보확인
  async checkUserIsLogin() {
    const user = await firebase.auth().currentUser;

    if (user) {
      const userData = {
        isAnonymous: user.isAnonymous,
        userDisplayName: user.displayName,
        userEmailVerified: user.emailVerified,
        userEmail: user.email
      };

      return userData;
    } else {
      const userData = {
        isAnonymous: null,
        userDisplayName: null,
        userEmailVerified: null,
        userEmail: null
      };

      return userData;
    }
  },

  // 전체 채널 목록
  async getAllChannels() {
    const QnAChannel = firestore.collection("QnAChannels");

    let channels = [];

    await QnAChannel.get()
      .then(doc => {
        doc.forEach(data => {
          let channelData = data.data();
          channelData.channel_doc_id = data.id;

          channels.push(channelData);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    return channels;
  },

  // 채널 코드를 통해 Doc 번호 가져오기
  async getDocByChannelCode(channelCode) {
    const flag = await this.checkChannelIsLive(channelCode);

    if (flag) {
      const QnAChannel = firestore.collection("QnAChannels");

      let QnAChannelDoc = await QnAChannel.where(
        "channel_code",
        "==",
        channelCode
      )
        .get()
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });

      let docId;

      QnAChannelDoc.forEach(doc => {
        if (doc.data().is_live) {
          docId = doc.id;
        }
      });

      return docId;
    } else {
      return false;
    }
  },

  // 코드에 해당되는 채널 살아있는지 확인
  async checkChannelIsLive(channelCode) {
    const QnAChannel = firestore.collection("QnAChannels");

    let QnAChannelDoc = await QnAChannel.where(
      "channel_code",
      "==",
      channelCode
    )
      .get()
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    let flag = false;

    QnAChannelDoc.forEach(doc => {
      if (
        doc.data().closed_at.timestamp.seconds <
        new Date().getTime() / 1000
      ) {
        QnAChannel.doc(doc.id).update({
          is_live: false
        });
      } else if (doc.data().is_live) {
        flag = true;
      }
    });

    return flag;
  },

  // 채널 생성
  async createChannel(channelCode, channelName, channelDescription, closeTime) {
    var user = firebase.auth().currentUser;
    const isLive = await this.checkChannelIsLive(channelCode);

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
            "일 " +
            now_timestamp.getHours() +
            "시 " +
            now_timestamp.getMinutes() +
            "분 " +
            now_timestamp.getSeconds() +
            "초"
        },
        closed_at: {
          timestamp: closeTime,
          string:
            closeTime.getFullYear() +
            "년 " +
            (closeTime.getMonth() + 1) +
            "월 " +
            closeTime.getDate() +
            "일 " +
            closeTime.getHours() +
            "시 " +
            closeTime.getMinutes() +
            "분 " +
            closeTime.getSeconds() +
            "초"
        }
      };

      await firestore.collection("QnAChannels").add(channel);
      const new_channel = await this.getDocByChannelCode(channelCode);

      const userTable = firestore.collection("VerifiedUserTable");

      let userTableDoc = await userTable
        .where("user_id", "==", user.uid)
        .get()
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });

      let docId;

      userTableDoc.forEach(doc => {
        docId = doc.id;
      });

      firestore
        .collection("VerifiedUserTable")
        .doc(docId)
        .update({
          owned_channels: firebase.firestore.FieldValue.arrayUnion(new_channel)
        });

      console.log(new_channel);
    } else if (isLive) {
      alert("채널 코드가 중복되었습니다.");
    } else {
      alert("인증된 로그인이 필요한 작업입니다.");
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

        let doc = await userTable
          .where("user_id", "==", user.uid)
          .get()
          .then(data => {
            return data;
          })
          .catch(err => {
            console.log("Error getting documents", err);
          });

        let userTableDocId;

        doc.forEach(data => {
          userTableDocId = data.id;
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

      const userTableDoc = await userTable
        .where("user_id", "==", user.uid)
        .get()
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });

      let userTableDocId;

      userTableDoc.forEach(data => {
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

  // 채널 상세 내용 수정
  async changChannelDetail(channelDocId, title, description) {
    const user = firebase.auth().currentUser;

    const channelDoc = firestore.collection("QnAChannels").doc(channelDocId);

    const channelData = await channelDoc.get().then(doc => {
      return doc.data();
    });

    if (user && user.uid == channelData.channel_owner.user_id) {
      channelDoc.update({
        channel_name: title,
        channel_description: description
      });
    } else {
      alert("잘못된 접근입니다.");
    }
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
            "일 " +
            now_timestamp.getHours() +
            "시 " +
            now_timestamp.getMinutes() +
            "분 " +
            now_timestamp.getSeconds() +
            "초"
        },
        hitCount: 0,
        hitList: []
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
      .then(data => {
        data.forEach(doc => {
          let data = doc.data();
          data.questionDocId = doc.id;
          questionsObject.push(data);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    return questionsObject;
  },

  // 질문 삭제
  async deleteQuestion(channelDocId, questionDocId) {
    const user = firebase.auth().currentUser;

    const questionDoc = firestore
      .collection("QnAChannels")
      .doc(channelDocId)
      .collection("Questions")
      .doc(questionDocId);

    const questionData = await questionDoc.get().then(doc => {
      return doc.data();
    });

    if (user && questionData.questioner.user_id == user.uid) {
      questionDoc.delete();
    } else {
      alert("잘못된 접근입니다.");
    }
  },

  // 특정 질문의 하트 수(hit) 증가/감소 (1,-1)
  questionHit(docId, questionDocId, num) {
    var user = firebase.auth().currentUser;

    if (user) {
      const questionDoc = firestore
        .collection("QnAChannels")
        .doc(docId)
        .collection("Questions")
        .doc(questionDocId);

      if (num == 1) {
        questionDoc.update({
          hitCount: firebase.firestore.FieldValue.increment(num),
          hitList: firebase.firestore.FieldValue.arrayUnion(user.uid)
        });
      } else if (num == -1) {
        questionDoc.update({
          hitCount: firebase.firestore.FieldValue.increment(num),
          hitList: firebase.firestore.FieldValue.arrayRemove(user.uid)
        });
      } else {
        alert("잘못된 접근입니다.");
      }
    } else {
      console.log("로그인이 필요한 기능입니다.");
    }
  },

  // 대댓글 달기 기능
  addQuestionReply(channelDocId, questionDocId, comment) {
    const user = firebase.auth().currentUser;
    const now_timestamp = new Date();

    if (user) {
      const questionDoc = firestore
        .collection("QnAChannels")
        .doc(channelDocId)
        .collection("Questions")
        .doc(questionDocId);

      const reply = {
        created_at: {
          timestamp: now_timestamp,
          string:
            now_timestamp.getFullYear() +
            "년 " +
            (now_timestamp.getMonth() + 1) +
            "월 " +
            now_timestamp.getDate() +
            "일 " +
            now_timestamp.getHours() +
            "시 " +
            now_timestamp.getMinutes() +
            "분 " +
            now_timestamp.getSeconds() +
            "초"
        },
        replyer: {
          user_email: user.email,
          user_email_verified: user.emailVerified,
          user_id: user.uid,
          user_name: user.displayName
        },
        comment: comment
      };

      questionDoc.collection("Replies").add(reply);
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  },

  // 대댓글 삭제 기능
  async deleteQuestionReply(channelDocId, questionDocId, replyDocId) {
    const user = firebase.auth().currentUser;

    const reply = firestore
      .collection("QnAChannels")
      .doc(channelDocId)
      .collection("Questions")
      .doc(questionDocId)
      .collection("Replies")
      .doc(replyDocId);

    const replyData = await reply
      .get()
      .then(doc => {
        return doc.data();
      })
      .catch(error => {
        console.log("deleteQuestionReply Method Error");
      });

    if (user && user.uid == replyData.replyer.user_id) {
      reply.delete();
    } else {
      alert("잘못된 접근입니다.");
    }
  },

  // 대댓글 가져오기
  async getRepliesFromQuestion(channelDocId, questionDocId) {
    const replies = firestore
      .collection("QnAChannels")
      .doc(channelDocId)
      .collection("Questions")
      .doc(questionDocId)
      .collection("Replies");

    let replyData = [];

    await replies.get().then(docs => {
      docs.forEach(doc => {
        replyData.push(doc.data());
      });
    });

    return replyData;
  },

  // 채널 상세정보 가져오기
  getChannelDetail(channelDocId) {
    const channelDoc = firestore.collection("QnAChannels").doc(channelDocId);

    return channelDoc.get().then(doc => {
      return doc.data();
    });
  },

  // 사용자가 참여한 채널 목록 불러오기
  async getOwnedChannels() {
    const user = firebase.auth().currentUser;

    if (user) {
      const userTable = firestore.collection("VerifiedUserTable");

      let docId;

      await userTable
        .where("user_id", "==", user.uid)
        .get()
        .then(doc => {
          doc.forEach(data => {
            docId = data.id;
          });
        });

      const userTableChannelData = await userTable
        .doc(docId)
        .get()
        .then(doc => {
          return doc.data();
        });

      console.log(userTableChannelData);
    }
  },

  // 질문의 hitList에 현재 유저가 속해있는지 확인
  async checkUserInHitList(channelDocId, questtionDocId) {
    const user = firebase.auth().currentUser;
    let flag = false;
    if (user) {
      const hitList = firestore
        .collection("QnAChannels")
        .doc(channelDocId)
        .collection("Questions")
        .doc(questtionDocId);

      const hitListData = await hitList.get().then(doc => {
        return doc.data();
      });

      hitListData.hitList.forEach(userList => {
        if (userList == user.uid) {
          flag = true;
        }
      });
    }
    return flag;
  }
};
