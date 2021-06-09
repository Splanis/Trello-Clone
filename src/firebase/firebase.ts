import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { config } from './config';

export const app = firebase.initializeApp(config);
export const auth = app.auth();
export const firestore = app.firestore();
export const firestoreField = firebase.firestore.FieldValue;
