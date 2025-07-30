import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCW6CJL-8-u6Iy1q4DwHlCb2kGn6Q_Q16o",
  authDomain: "plan2protect-51356.firebaseapp.com",
  databaseURL: "https://plan2protect-51356-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "plan2protect-51356",
  storageBucket: "plan2protect-51356.firebasestorage.app",
  messagingSenderId: "603987562142",
  appId: "1:603987562142:web:b331b9bd37d5e57bbc358f",
  measurementId: "G-77W5PQ5XB9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;