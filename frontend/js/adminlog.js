console.log("working");


function submit2(){
    let email = document.querySelector("#mail").value;
    let password = document.querySelector("#pass1").value;
    if(email == "admin@gmail.com" && password == "admin12" ){
        window.location.assign("../html/admin.html")
    }
}