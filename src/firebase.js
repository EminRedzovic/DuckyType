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
export const getLoggedInUserData = async (user) => {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData;
    } else {
      throw new Error("Dokument korisnika nije pronađen");
    }
  } catch (error) {
    console.error("Greška prilikom dohvaćanja podataka korisnika:", error);
  }
};
