window.onload = function () {
    const hambtn1 = document.querySelector("#ham-nav");
    const hambtn = document.querySelector(".hamburger");
    hambtn.addEventListener("click",()=>{
        hambtn.classList.toggle("is-active");
        hambtn1.classList.toggle("is-active");
    })
}


console.log("working");
const token = localStorage.getItem("token");

const getData = () => {
    fetch("https://shy-ruby-caiman-vest.cyclic.app/fooditem/", {
        method:"GET",

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

// let product_main = document.querySelector(".product-container");
// function displayTable(data){
//     console.log(data)
// }



function displayTable(data){
    console.log(data)
    let main = document.querySelector("#foodcolumn");
    
    data.forEach((ele,item) => {
        let div = document.createElement("div");
        
        let img = document.createElement("img");
        img.setAttribute("src",ele.image)

        let title = document.createElement("h1");
        title.textContent = ele.title

        let type = document.createElement("h1");
        type.textContent = ele.type

        let price = document.createElement("p");
        price.textContent = ele.price

        let button = document.createElement("button");
        button.textContent = "Add to Cart"
        button.addEventListener("click",()=>{
            if(token){
                alert("added to the cart")
                addToCartfun(ele)

            }else{

            }
            
        })

        div.append(img, title, type, price, button);

        main.append(div);
        
    })
}

function addToCartfun(prod) {

    fetch(`https://shy-ruby-caiman-vest.cyclic.app/cart/create`, {
        method: "POST",
        body: JSON.stringify(prod),
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
    }).then(res=> res.json()).then(data =>console.log(data)).catch(err => console.log(err))

}