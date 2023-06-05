window.onload = function () {
    const hambtn1 = document.querySelector("#ham-nav");
    const hambtn = document.querySelector(".hamburger");
    hambtn.addEventListener("click",()=>{
        hambtn.classList.toggle("is-active");
        hambtn1.classList.toggle("is-active");
    })
}
let namee = document.querySelector("#login");
let n = localStorage.getItem("name");
if(n){
    namee.innerHTML = "";
    let h1 = document.createElement("h1");
    h1.innerText = n;
    let h2 = document.createElement("h1");
    h2.innerText = "Logout"
    h2.addEventListener("click",(e)=>{
        
        localStorage.clear();
    })

    let h3 = document.createElement("h1");
    h3.innerText = "||"
    namee.append(h1,h3,h2);
}