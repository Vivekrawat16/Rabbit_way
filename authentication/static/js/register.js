
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBPwNvHOZEyMiRksIqIaBG4gjZe66HSLqM",
    authDomain: "rabbit-way-f7507.firebaseapp.com",
    projectId: "rabbit-way-f7507",
    storageBucket: "rabbit-way-f7507.firebasestorage.app",
    messagingSenderId: "23773077005",
    appId: "1:23773077005:web:74080b6136a2e959c7bf44",
    measurementId: "G-KVCRR798S8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // auth.js

            
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;

            if (password !== confirmPassword) {
                showToast('Passwords do not match!', 'error');
                return;
            }

            const submit = document.getElementById('submit');
            submit.addEventListener("click",function(event){
                event.preventDefault()
                alert(5)
            })

   
