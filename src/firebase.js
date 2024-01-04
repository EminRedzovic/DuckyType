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
  apiKey: "AIzaSyC9fV26pfRrw-0lwOOaaUgplYXse8Ftcok",
  authDomain: "ducky-type.firebaseapp.com",
  projectId: "ducky-type",
  storageBucket: "ducky-type.appspot.com",
  messagingSenderId: "1078686550374",
  appId: "1:1078686550374:web:dac25dcec18a7b411960a7",
  measurementId: "G-0Y2ZSBJ9FP",
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
    // Dohvati referencu kolekcije korisnika iz Firebase Firestore
    const usersCollection = collection(db, "users");

    // Napravi upit koji proverava da li postoji korisnik s istim korisničkim imenom
    const q = query(usersCollection, where("displayName", "==", name));

    // Dohvati rezultate upita
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.empty);
    return querySnapshot.empty; // Ako je kolekcija prazna, korisničko ime je dostupno
  } catch (error) {
    console.error("Greška pri proveri dostupnosti displayName:", error);
    return false;
  }
};
