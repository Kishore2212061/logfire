// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBGBC1lnMPTc-SqoXbBlLl-_pkI4kZmpU",
  authDomain: "project-8180717841588907822.firebaseapp.com",
  projectId: "project-8180717841588907822",
  storageBucket: "project-8180717841588907822.appspot.com",
  messagingSenderId: "1058107730187",
  appId: "1:1058107730187:web:b5badc6e19897b6b855a0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to the Firestore collection
const colRef = collection(db, 'submissions');

// Function to retrieve and log documents from the Firestore collection
async function getSubmissions() {
  try {
    const snapshot = await getDocs(colRef);
    let submissions = [];
    snapshot.docs.forEach((doc) => {
      submissions.push({ ...doc.data(), id: doc.id });
    });
    console.log(submissions);
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const department = document.getElementById('department').value;
  const rollNumber = document.getElementById('roll-number').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  try {
    await addDoc(colRef, {
      name,
      email,
      department,
      rollNumber,
      subject,
      message,
      timestamp: new Date()
    });
    alert('Form submitted successfully!');
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Error submitting form.');
  }
}

// Event listener for form submission
document.getElementById('sample-form').addEventListener('submit', handleFormSubmit);

// Retrieve and log submissions on page load
getSubmissions();
