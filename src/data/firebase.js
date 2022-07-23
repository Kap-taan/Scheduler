import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAxUxI53pDsy83nsJbtHUrG_wy-ycNKt_k",
  authDomain: "todoapp-d92f3.firebaseapp.com",
  projectId: "todoapp-d92f3",
  storageBucket: "todoapp-d92f3.appspot.com",
  messagingSenderId: "123438936009",
  appId: "1:123438936009:web:ba0cde3ff031106e760218"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;