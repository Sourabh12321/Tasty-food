window.onload = function () {
    const hambtn1 = document.querySelector("#ham-nav");
    const hambtn = document.querySelector(".hamburger");
    hambtn.addEventListener("click", () => {
        hambtn.classList.toggle("is-active");
        hambtn1.classList.toggle("is-active");
    })
}
window.addEventListener("load", () => {
    getData();
})
let temp = [];
let namee = document.querySelector("#login");
let main = document.querySelector("#foodcolumn");
const sort = document.querySelector("#sort");
const search = document.querySelector("#search");

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


search.addEventListener("input", () => {
    console.log("click");
    let sData = search.value;
    console.log(sData);
    let Search = temp.filter((el, i) => {
        return el.title.toLowerCase().includes(sData.toLowerCase());
    })
    displayTable(Search);
})

sort.addEventListener("change", (e) => {
    if (sort.value == "") {
        displayTable(temp);
    } else if (sort.value == "ASC") {
        let sortedData = temp.sort((a, b) => {
            return a.price - b.price;
        })
        displayTable(sortedData)
        console.log(sortedData)
    } else if (sort.value == "DESC") {
        let sortedData = temp.sort((a, b) => {
            return b.price - a.price;
        })
        displayTable(sortedData)
        console.log(sortedData)
    }
})

console.log("working");
const token = localStorage.getItem("token");

const getData = () => {
    fetch("http://localhost:7000/fooditem/Non-veg").then((res) => {
        return res.json();
    }).then((data) => {
        // console.log(data);
        temp = data.msg;
        displayTable(temp);

    }).catch((err) => {
        console.log(err.message);
    })

}







function displayTable(data) {
    console.log(data)
    main.innerHTML = "";

    data.forEach((ele, item) => {
        let div = document.createElement("div");

        let img = document.createElement("img");
        img.setAttribute("src", ele.image)

        let title = document.createElement("h1");
        title.textContent = ele.title

        let type = document.createElement("h1");
        type.textContent = ele.type

        let pDiv = document.createElement("div");

        let price = document.createElement("p");
        price.textContent = ele.price

        let span = document.createElement("span");
        span.textContent = " Rs."
        price.append(span)

        let button = document.createElement("button");
        button.textContent = "Add to Cart"
        button.addEventListener("click", () => {
            if (token) {
                let obj = {
                    title:ele.title,
                    image:ele.image,
                    type:ele.type,
                    price:ele.price,
                    quantity:1
                }
                console.log(obj);
                addToCart(obj)

            } else {
                swal.fire({
                    title: "Please Login First",
                    icon: "Warning",
                })
                setTimeout(() => {
                    window.location.href = "login.html"
                }, 3000)

            }

        })

        div.append(img, title, type, price, button);

        main.append(div);

    })
}

function addToCart(ele) {

    fetch(`http://localhost:7000/cart/create`, {
        method: "POST",
        body: JSON.stringify(ele),
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
    }).then(res => res.json()).then(data =>{
        console.log(data)
        swal.fire({
            title: "Product added successfully",
            icon: "success",
        })
        
    }).catch(err => console.log(err))
}