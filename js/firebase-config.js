// ============================================
// FIREBASE KONFIGURASI - PUNYA ANAS
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyC_0wjfxxWdLwLjhtdtpThaNsLnkX-TOG0",
  authDomain: "for-tisyaa.firebaseapp.com",
  databaseURL: "https://for-tisyaa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "for-tisyaa",
  storageBucket: "for-tisyaa.firebasestorage.app",
  messagingSenderId: "51829800405",
  appId: "1:51829800405:web:7033ca15bde8537ac9115c",
  measurementId: "G-RN5KRGPHN2"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Referensi database
const database = firebase.database();
const responsesRef = database.ref('responses');

console.log('%c🔥 Firebase Connected! Siap tracking response Tisya!', 'color: #ff6b9d; font-weight: bold;');
console.log('%c📊 Database URL:', 'color: #f0c87b;', firebaseConfig.databaseURL);