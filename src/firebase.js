import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsVo2H8mKsXh6iiuZtoo7Hnz1Xigp0ScY",
  authDomain: "notedoctor-d96e7.firebaseapp.com",
  projectId: "notedoctor-d96e7",
  storageBucket: "notedoctor-d96e7.appspot.com",
  messagingSenderId: "1053079986503",
  appId: "1:1053079986503:web:8bc20717f73a9288fdec62",
  measurementId: "G-E2E401FCH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);