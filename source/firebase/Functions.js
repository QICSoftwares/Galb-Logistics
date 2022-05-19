import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {Notifications} from 'react-native-notifications';

MMKV = new MMKVLoader().initialize();

export const CheckLogin = props => {
  function onAuthStateChanged(user, subscriber) {
    props(user, subscriber);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user =>
      onAuthStateChanged(user, subscriber),
    );
    return; // unsubscribe on unmount
  }, []);
};

export const SendEmailVerification = () => {
  var actionCodeSettings = {
    iOS: {
      bundleId: 'com.qic.galb',
    },
    android: {
      packageName: 'com.qic.galb',
      installApp: true,
      minimumVersion: '1',
    },
    handleCodeInApp: true,
  };
  auth()
    .currentUser.sendEmailVerification()
    .catch(error => {
      alert(error);
    });
};

export const CreateAcc = (
  email,
  password,
  name,
  phonenumber,
  navigation,
  callBack,
) => {
  var token;
  Notifications.registerRemoteNotifications();
  Notifications.events().registerRemoteNotificationsRegistered(event => {
    // TODO: Send the token to my server so it could send back push notifications...
    console.log('Device Token Received', event.deviceToken);
    token = event.deviceToken;
  });
  Notifications.events().registerRemoteNotificationsRegistrationFailed(
    event => {
      console.error(event);
    },
  );
  auth()
    .createUserWithEmailAndPassword(email.trim(), password)
    .then(user => {
      SendEmailVerification();
      callBack('verify');
      PostFirestore('Users', user.user.uid, {
        email: email.trim(),
        name: name.trim(),
        phonenumber: phonenumber.trim(),
        uid: user.user.uid,
        balance: 0.0,
        orders: [],
        address: [],
        token: {token},
      });

      setTimeout(() => {
        navigation.navigate('Login');
      }, 5000);
    })
    .catch(error => {
      callBack(error);
    });
};

export const PostFirestore = (collection, doc, items) => {
  firestore()
    .collection(collection)
    .doc(doc)
    .set(items)
    .then(() => {})
    .catch(e => {
      alert(e);
    });
};

export const Logout = navigation => {
  auth()
    .signOut()
    .then(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Signin'}],
      });
      navigation.navigate('Signin');
    })
    .catch(e => {
      alert(e);
    });
};

export const Login = (email, password, navigation, callBack) => {
  auth()
    .signInWithEmailAndPassword(email.trim(), password)
    .then(user => {
      if (user.user.emailVerified === true) {
        const callBackk = async () => {
          const u = await OneFireRead('Users', user.user.uid);
          console.log(u);
          await MMKV.setStringAsync('name', u._data.name.trim());

          await MMKV.setStringAsync('uid', u._data.uid)
          .catch(error => {
            console.log(error);
          });
        };

        callBackk()
          .then(() => {
            navigation.navigate('Drawer');
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        callBack('verify');
      }
    })
    .catch(error => {
      console.log(error);
      callBack(error);
    });
};

export const OneFireRead = async (col, doc) => {
  return await firestore().collection(col).doc(doc).get();
};

export const PasswordReset = (Email, callBack) => {
  auth()
    .sendPasswordResetEmail(Email.trim())
    .then(user => {
      callBack('email');
    })
    .catch(function (e) {
      callBack(e);
    });
};

export const GetFireStore = (collection, doc, tesst) => {
  const subscriber = firestore()
    .collection(collection)
    .doc(doc)
    .onSnapshot(documentSnapshot => {
      console.log(documentSnapshot.metadata.fromCache);
      tesst(documentSnapshot.data());
    });

  return subscriber;
};
