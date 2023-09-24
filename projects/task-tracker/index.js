// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc,setDoc,doc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDU95mBEwswXTrehr6-awwFxPNMOqnEscM",
    authDomain: "peak-suprstate-384109.firebaseapp.com",
    projectId: "peak-suprstate-384109",
    storageBucket: "peak-suprstate-384109.appspot.com",
    messagingSenderId: "764256186835",
    appId: "1:764256186835:web:ecdecc4c9b5bd4bb1e7f26",
    measurementId: "G-QG56KL9Y1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getFirestore();



const currentPage = window.location.pathname;

if (currentPage == '/register.html') {
    document.querySelector('.register').addEventListener('click', register)
    document.querySelector('.login-btn').addEventListener('click', () => {
        window.location.href = '/login.html'
    });

}

// ...

function register() {
    // Get all input fields
    const full_name = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email & Password Are Required');
        return;
    }
    if (validate_field(full_name) == false) {
        alert('Name is required');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;

            const userRef = doc(database, 'users', uid); // Create a Firestore document reference

            const user_data = {
                email: email,
                full_name: full_name,
                last_login: Date.now()
            };

            setDoc(userRef, user_data)
                .then(() => {
                    alert('User Created');
                    window.location.href = 'index.html'
                })
                .catch((error) => {
                    console.error('Error adding user data to Firestore:', error);
                });

        })
        .catch((error) => {
            console.log(error);
        });
}

// ...




if (currentPage == '/login.html') {
    document.querySelector('.login-btn').addEventListener('click', login);
    document.querySelector('.register-btn').addEventListener('click', () => {
        window.location.href = '/register.html'
    });

}
function login() {
    // Get the user's input for email and password
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;

    if (validate_email(email) === false || validate_password(password) === false) {
        alert('Invalid email or password');
        return;
    }

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successfully logged in
            const user = userCredential.user;
            console.log('User logged in:', user);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            // Handle login errors
            console.error(error);
            alert('Login failed. Please check your email and password.');
        });
}



function validate_email(input_email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(input_email);
}


function validate_password(password) {
    if (password.length < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }
    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}


// Function to check if a user is logged in
function checkUserAuthStatus(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in
            callback(true);

        } else {
            // User is not logged in
            callback(false);
        }
    });
}

checkUserAuthStatus((isUserLoggedIn) => {
    const currentPage = window.location.pathname;

    if (!isUserLoggedIn && currentPage == '/index.html') {
        window.location.href = 'login.html';
    }
});



if (currentPage == '/index.html') {
    document.querySelector('.logout').addEventListener('click', logout);
}
// Log the user out
function logout() {
    signOut(auth)
        .then(() => {
            // User has been logged out
            console.log("User logged out");
            window.location.href = 'login.html';
        })
        .catch((error) => {
            // Handle logout errors
            console.error("Logout error:", error);
        });
}

