function fetchUser() {
  console.log("***** fetchUser *****");
}

function deleteUser() {
  console.log("***** deleteUser *****");
}

// Get users

// const { response } = require("express");

function getAllUsers() {
  const url = "http://localhost:5000/fetch-all-users";
  const table = document.getElementById("users");

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      users.map((user) => {
        let newRow = table.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        // let cell4 = newRow.insertCell(3);
        cell1.innerHTML = user.name;
        cell2.innerHTML = user.email;
        cell3.innerHTML = `<span class='edit' onclick='fetchUser()'>Edit</span> <span class='delete' onclick='${deleteUser()}'>Delete</span>`;
        cell3.dataset.userid = user.id;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

getAllUsers();

///////////////////////////////////////////////////////////////

// Create users

function CreateUser() {
  let userForm = document.getElementById("user-form");

  userForm.onsubmit = (event) => {
    event.preventDefault(); // not refresh the page
    let formData = new FormData(userForm);
    let data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    //
    const url = "http://localhost:5000/create";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        alert("Done!");
        location.reload();
      } else {
        alert("Error");
      }
    });
  };
}

CreateUser();

/* this code sends a POST request to a server and displays an alert message 
based on the response status returned by the server. It's commonly used in 
web development for sending data to a server and handling the response. */

////////////////////////////////////////////////////

// delete user

// function deleteUser() {
//   console.log("***** deleteUser *****");
// }

// function fetchUser() {
//   console.log("***** fetchUser *****");
// }
