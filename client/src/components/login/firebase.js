// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDm3CZTiqGcV0MXEftEagGtZCfJpUXJMjM",
    authDomain: "realmap-b5c15.firebaseapp.com",
    projectId: "realmap-b5c15",
    storageBucket: "realmap-b5c15.firebasestorage.app",
    messagingSenderId: "549411208478",
    appId: "1:549411208478:web:fdbd58d18ea10cab34dd0f"
  };
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);