import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD6enI6wg6QUj7gVY5T-v6AVuAGOrjaYp4',
  authDomain: 'witcher-wiki-f27b2.firebaseapp.com',
  projectId: 'witcher-wiki-f27b2',
  storageBucket: 'witcher-wiki-f27b2.appspot.com',
  messagingSenderId: '753526703697',
  appId: '1:753526703697:web:8661a277ee0a380809da70',
  measurementId: 'G-C07QJXLEB5',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
