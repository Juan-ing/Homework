import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBrUZJqBwkFErjy-m3a9jJKMr-eGGRgwqM',
  authDomain: 'homeworkbaseall.firebaseapp.com',
  projectId: 'homeworkbaseall',
  storageBucket: 'homeworkbaseall.firebasestorage.app',
  messagingSenderId: '614182224854',
  appId: '1:614182224854:web:1d1e368972abc8fb1b5a77',
  measurementId: 'G-EDSRR7QQDY',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, 'baseall');
export const analytics = isSupported().then((supported) => (supported ? getAnalytics(app) : null));
