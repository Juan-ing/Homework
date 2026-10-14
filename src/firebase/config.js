import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBrUZJqBwkFErjy-m3a9jJKMr-eGGRgwqM',
  authDomain: 'homeworkbaseall.firebaseapp.com',
  projectId: 'homeworkbaseall',
  storageBucket: 'homeworkbaseall.firebasestorage.app',
  messagingSenderId: '614182224854',
  appId: '1:614182224854:web:1d1e368972abc8fb1b5a77',
  measurementId: 'G-EDSRR7RQDY',
};

const requiredConfigKeys = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
];

for (const key of requiredConfigKeys) {
  const value = firebaseConfig[key];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Falta el valor "${key}" en la configuración de Firebase.`);
  }
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
