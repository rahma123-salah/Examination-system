var form = document.getElementById("form");
var firstName = document.getElementById("username");
var lastName = document.getElementById("username2");
var email = document.getElementById("email");
var password = document.getElementById("password");
var passwordCheck = document.getElementById("password2");
var myButton = document.getElementById("myBtn");
var allow = false;
var array=[];
form.addEventListener("submit", (e) => {
    checking();
    if (allow) {
        e.preventDefault();
        console.log("true")
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var user = {
            email: email,
            password: password,
        }
        var json = JSON.stringify(user);
        localStorage.setItem(email, json);
        console.log("user added")
        window.location.replace("page2.html");
    }
    else {
        console.log("false");
        e.preventDefault();
    }
});
function checking() {
    var fname = firstName.value;
    var lname = lastName.value;
    var useremail = email.value;
    var pass1 = password.value;
    var pass2 = passwordCheck.value;
    if (fname === ""||Number(fname)) {
        error(firstName, "name shouldn't be empty and be sting");
    }
    else {
        succes(firstName);
    }
    if (lname === ""||Number(lname)) {
        error(lastName, "name shouldn't be empty and be sting");
    }
    else {
        succes(lastName);
    }

    if (useremail === "") {
        error(email, "email shouldn't be empty");

    } else if (!isEmail(useremail)) {
        error(email, "email is not vaild");
    }
    else {
        succes(email);
    }

    if (pass1 === "") {
        error(password, "password shouldn't be empty");
    }
    else {
        succes(password);
    }

    if (pass2 === "") {
        error(passwordCheck, "");
    } else if (pass1 !== pass2) {
        error(passwordCheck, "password doesn't match");
    }
    else {
        succes(passwordCheck);
    }

}
function error(input, message) {
    allow = false;
    var control = input.parentElement;//form-control
    var small = control.querySelector("small");
    small.innerText = message;
    control.className = "form-control error"; //error class

}
function succes(input) {
    allow = true;
    var succes = input.parentElement;
    succes.className = "form-control sucsses";

}
function isEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)

}

