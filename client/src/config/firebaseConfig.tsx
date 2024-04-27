import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAJhWJKGhwln-9VnNvI1bnHJpOc2GkWkfk",
  authDomain: "fcm-test-client-app.firebaseapp.com",
  projectId: "fcm-test-client-app",
  storageBucket: "fcm-test-client-app.appspot.com",
  messagingSenderId: "847414833906",
  appId: "1:847414833906:web:74372bb02da078c490966b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);