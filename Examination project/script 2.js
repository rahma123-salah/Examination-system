var button = document.getElementById("button");
var myKey;
var allow = false;
button.addEventListener("click",function (e) {
   e.preventDefault();
   myKey=email.value;
    if (localStorage.getItem(myKey) !== null) {
        var user=JSON.parse(window.localStorage.getItem(myKey));
        var uemail = user.email;
        var upassword = user.password;

        if (email.value !== uemail) {
            console.log("error e");
        }
        else if (password.value !== upassword) {
            error(password, "NOT CORRECT");
        } 
        else {
            succes(password);
            window.location.replace("exam.html");
            
        }

    }
  
})
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