import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAQRV9-NddKTwhpBT9OC_dXilS68KK4Km0",
  authDomain: "house-market-place-app-abe1a.firebaseapp.com",
  projectId: "house-market-place-app-abe1a",
  storageBucket: "house-market-place-app-abe1a.appspot.com",
  messagingSenderId: "505467804792",
  appId: "1:505467804792:web:9ae71d0daf34b1fc04218d",
};

initializeApp(firebaseConfig);

export const db = getFirestore();

const storage = getStorage();
export default storage;
