import { initializeApp } from "firebase/app";
import{getDatabase} from "firebase/database"
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVhn6cZDro7Rrbd9hrUwo8bdIBhUl88tA",
  authDomain: "full-stack-example-ba55a.firebaseapp.com",
  databaseURL: "https://full-stack-example-ba55a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "full-stack-example-ba55a",
  storageBucket: "full-stack-example-ba55a.appspot.com",
  messagingSenderId: "533969845212",
  appId: "1:533969845212:web:1ed43c93a17e2d89fd2d19",
  measurementId: "G-6DXC79CTDM"
};


const app = initializeApp(firebaseConfig);
export const firebasedatabase=getDatabase(app);
export const firebaseStorage=getStorage(app);