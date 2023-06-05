

const btn = document.querySelector("#btn");

const token = localStorage.getItem("token");
const id = localStorage.getItem("id");
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

const getData = () => {
    fetch(`http://localhost:7000/cart/${id}`, {
        method: "GET",

        headers: {
            "Authorization": token
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
    let total = 0;
    const totalprice = document.querySelector("#showtotalprice");

    data.forEach((el, index) => {
        let price = document.createElement("p");
        price.textContent = el.price;
        total += Number(el.price);
    })
    totalprice.textContent = total;
}

// name lastname address country city pincode number email




btn.addEventListener("click", () => {
    swal.fire({
        title: "order placed successfully",
        icon: "success",
    })
    setTimeout(()=>{
        window.location.href = "index.html"
    },3000)
    
})

