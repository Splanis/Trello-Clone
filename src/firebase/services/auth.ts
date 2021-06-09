import firebase from 'firebase';
import { auth } from '../firebase';

export const firebaseSignOut = () => auth.signOut();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(provider);
  } catch (error) {
    console.log(error);
  }
};

export const signInAnonymously = async () => {
  try {
    await auth.signInAnonymously();
  } catch (error) {
    console.log(error);
  }
};
