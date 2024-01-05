import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyC9fV26pfRrw-0lwOOaaUgplYXse8Ftcok",
  // authDomain: "ducky-type.firebaseapp.com",
  // projectId: "ducky-type",
  // storageBucket: "ducky-type.appspot.com",
  // messagingSenderId: "1078686550374",
  // appId: "1:1078686550374:web:dac25dcec18a7b411960a7",
  // measurementId: "G-0Y2ZSBJ9FP",

  // REACT_APP_FIREBASE_API_KEY=AIzaSyC9fV26pfRrw-0lwOOaaUgplYXse8Ftcok
  // REACT_APP_FIREBASE_AUTH_DOMAIN=ducky-type.firebaseapp.com
  // REACT_APP_FIREBASE_PROJECT_ID=ducky-type
  // REACT_APP_FIREBASE_STORAGEBUCKET=ducky-type.appspot.com
  // REACT_APP_FIREBASE_MESSAGINGSENDERID=1078686550374
  // REACT_APP_FIREBASE_APPID= 1:1078686550374:web:dac25dcec18a7b411960a7
  // REACT_APP_FIREBASE_MEASUREMENTID= G-0Y2ZSBJ9FP

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const logout = async () => {
  const result = await signOut(auth);
  return result;
};

export const getBoardData = async () => {
  const docRef = collection(db, "races");
  const docSnap = await getDocs(docRef);
  const data = docSnap.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    return { ...data, id: id };
  });
  return data;
};

export const submitLoginData = async (data) => {
  const result = await addDoc(collection(db, "users"), {
    ...data,
    userId: auth.currentUser.uid,
  });
  return result;
};

export const isUsernameAvailable = async (name) => {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("displayName", "==", name));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  } catch (error) {
    console.error(error);
    return false;
  }
};
