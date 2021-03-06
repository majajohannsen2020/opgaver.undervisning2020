"use strict";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBe0Lk3qwX3e71JBYw4VP-wHfJc8AWol4g",
  authDomain: "fir-2020-70d61.firebaseapp.com",
  databaseURL: "https://fir-2020-70d61.firebaseio.com",
  projectId: "fir-2020-70d61",
  storageBucket: "fir-2020-70d61.appspot.com",
  messagingSenderId: "947284176349",
  appId: "1:947284176349:web:53aa160a8b7029dab91a34",
  measurementId: "G-F2CGPN25HW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const userRef = db.collection("users");

let selectedUserId = "";

// ========== READ ==========
// watch the database ref for changes
userRef.onSnapshot(function(snapshotData) {
  let users = [];
  snapshotData.forEach(function(doc) {
    let user = doc.data();
    console.log(user);
    user.id = doc.id;
    users.push(user);
  });
  appendUsers(users);
});

// append users to the DOM
function appendUsers(users) {
  console.log(users);
  let template = "";
  for (const user of users) {
template += /*html*/ `
<article>
  <h2>${user.name}</h2>
  <p><a href="mailto:${user.mail}">${user.mail}"</a></p>
  <button onclick="selectUser('${user.id}','${user.name}','${user.mail}')">Update</button>
  <button onclick="deleteUser('${user.id}')">Delete</button>
  </article>
`;
  }
  document.getElementById("content").innerHTML = template;
}

// ========== CREATE ==========
// add a new user to firestore (database)
function createUser() {
let nameInput = document.getElementById("name");
let mailInput = document.getElementById("mail");

let newUser = {
  name: nameInput.value,
  mail: mailInput.value
}

userRef.add(newUser);
nameInput.value = "";
mailInput.value = "";
}

// ========== UPDATE ==========

function selectUser(id, name, mail) {
  // references to the input fields
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');
  nameInput.value = name;
  mailInput.value = mail;
  selectedUserId = id;

}

function updateUser() {
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');

  let userToUpdate = {
    name: nameInput.value,
    mail: mailInput.value
  };

  userRef.doc(selectedUserId).update(userToUpdate);
}

// ========== DELETE ==========
function deleteUser(id) {
  userRef.doc(selectedUserId).delete();

}