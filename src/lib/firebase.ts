import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD1n4HPvOzZ85GqNp8uwayVX1SnnmDqT90",
    authDomain: "buymecoffee-48282.firebaseapp.com",
    projectId: "buymecoffee-48282",
    storageBucket: "buymecoffee-48282.appspot.com",
    messagingSenderId: "583085419434",
    appId: "1:583085419434:web:5fff206a7bac6135a599d3",
    measurementId: "G-KRWC85GVQZ"
  };
  
  // Initialize Firebase
  export const firebaseApp = initializeApp(firebaseConfig);