import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQnPoZ_cjI0OZvrh_9CbUQBJp-CfDOwvQ",
  authDomain: "crud-app-87703.firebaseapp.com",
  projectId: "crud-app-87703",
  storageBucket: "crud-app-87703.appspot.com",
  messagingSenderId: "204676065810",
  appId: "1:204676065810:web:cfd6e8cebb043d4fb1c6cb",
  measurementId: "G-BMRQRBFXLP"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
