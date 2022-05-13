import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

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
  const callBackk = () => {};
  auth()
    .createUserWithEmailAndPassword(email.trim(), password)
    .then(user => {
      SendEmailVerification();
      callBack('verify');
      PostFirestore(
        'Users',
        user.user.uid,
        {
          email: email,
          name: name,
          phonenumber: phonenumber,
          uid: user.user.uid,
        },
        callBackk,
      );
      setTimeout(() => {
        navigation.navigate('Login');
      }, 500);
    })
    .catch(error => {
      callBack(error);
    });
};

export const PostFirestore = (collection, doc, items, callBack) => {
  firestore()
    .collection(collection)
    .doc(doc)
    .set(items)
    .then(() => {
      callBack;
    })
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
      navigation.navigate('Sigin');
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
        navigation.navigate('Drawer');
      } else {
        callBack('verify');
      }
    })
    .catch(error => {
      console.log(error);
      callBack(error);
    });
};

export const PasswordReset = (Email, callBack) => {
  auth()
    .sendPasswordResetEmail(Email)
    .then(user => {
      callBack('email');
    })
    .catch(function (e) {
      callBack(e);
    });
};
