console.log("working");

const form = document.querySelector("#form");

const token = localStorage.getItem("token");



form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let obj = {
        title : form.title.value,
        image : form.image.value,
        type : form.type.value,
        price : form.price.value
    }
    console.log(obj);

    fetch(`https://shy-ruby-caiman-vest.cyclic.app/create`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
    }).then(res=> res.json()).then(data =>console.log(data)).catch(err => console.log(err))
    
})


const getData = () => {
    fetch("https://shy-ruby-caiman-vest.cyclic.app/users/", {
        method: "GET",

        headers: {
            "Authorization": localStorage.getItem("token")
        }

    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        displayTable(data);

    })

}
getData()






function displayTable(data) {
    console.log(data)
    let main = document.querySelector("tbody");

    data.forEach((element) => {
        let tr = document.createElement('tr');
        let name = document.createElement('td');
        name.textContent = element.name;
  
        let email = document.createElement('td');
        email.textContent = element.email;

        let password = document.createElement('td');
        password.textContent = element.password;
  
        
        tr.append(name, email, password);
        main.append(tr);
    })
}

document.querySelector("#homepage").addEventListener("click",()=>{
    window.location.assign("../html/index.html")
})


