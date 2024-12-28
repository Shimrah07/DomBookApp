// Page Details:
// 1. index.html (Login Page)
// Contains a login form with:
// Two input fields: Email and Password
// Upon form submission:

// Validate the credentials:
// Admin Login:
// Email: admin@empher.com
// Password: empher@123
// Redirect to admin.html and show an alert: "Logged in as Admin."

// User Login:
// Email: user@empher.com
// Password: user@123;
// Redirect to books.html.

// If credentials are incorrect, display an error message.
// On successful login, save user details in localStorage as loginData.


let form = document.getElementById("form");
form.addEventListener("submit", ()=>{
// event.preventDefault();

let email = form.email.value;
let password = form.password.value;

let userObj = {email, password}

if(email == "admin@empher.com" && password == "empher@123"){
    
    window.location.href = "admin.html"
    alert("Logged in as Admin.")

    userArr = JSON.parse(localStorage.getItem("loginData")) || [];
    userArr.push(userObj);
    localStorage.setItem("loginData", JSON.stringify(userArr));
}
else if(email == "user@empher.com" && password == "user@123"){
    window.location.href = "books.html"
    alert("Logged in as User!!")
    
    
    userArr = JSON.parse(localStorage.getItem("loginData")) || [];
    userArr.push(userObj);
    localStorage.setItem("loginData", JSON.stringify(userArr));
    
}
else{
    alert("Wrong Credentials");
}

})