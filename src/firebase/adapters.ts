import firebase from 'firebase/app';
import { User } from '../models/User';
import anonymousImage from '../assets/anonymous_image.jpg';

export const adaptFirebaseUser = (user: firebase.User): User => ({
  userId: user.uid,
  photo: user.photoURL || anonymousImage,
  username: user.displayName ?? 'anonymous'
});
