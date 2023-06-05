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

let slideshow = document.querySelector("#slideshow>img");
let token = localStorage.getItem("token");

if(n){
    namee.innerHTML = "";
    let h1 = document.createElement("h1");
    h1.innerText = n;
    let h2 = document.createElement("h1");
    h2.innerText = "Logout"
    h2.style.cursor = "pointer";
    h2.addEventListener("click",(e)=>{
        localStorage.clear();
        window.location.reload();
    })

    let h3 = document.createElement("h1");
    h3.innerText = "||"
    namee.append(h1,h3,h2);
}

let img = ["https://www.qsrmagazine.com/sites/default/files/slideshow-images/slides/mcdonaldsglobal.jpg", "https://c4.wallpaperflare.com/wallpaper/495/760/53/cuisine-food-india-indian-wallpaper-preview.jpg", "https://post.healthline.com/wp-content/uploads/2020/08/Food_Bowl_Overhead_1200x628-facebook-1200x628.jpg", "https://wallpapercave.com/wp/wp4696898.png"];


let index = 0;
function slide() {
    slideshow.setAttribute("src", img[index]);
    index++;
    if (index >= img.length) {
        index = 0;
    }
}

setInterval("slide()", 2000);

const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})


const getData = () => {
    fetch("http://localhost:7000/fooditem/", {

        headers: {
            "Authorization": localStorage.getItem("token")
        }

    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data.msg);
        displayTable(data.msg);

    })

}
getData()

// let product_main = document.querySelector(".product-container");
// function displayTable(data){
//     console.log(data)
// }



function displayTable(data){
    console.log(data)
    let product_main = document.querySelector(".product-container");
    
    data.forEach((ele,item) => {
        let main = document.createElement("div");
        main.setAttribute("class", "product-card");

        let div1 = document.createElement("div");``
        div1.setAttribute("class","product-image")

        let span = document.createElement("span");
        span.setAttribute("class","discount-tag")

        let image = document.createElement("img");
        image.setAttribute("src",ele.image);
        image.setAttribute("class","product-thumb");

        let button =  document.createElement("button");
        button.setAttribute("class","card-btn")
        div1.append(span, image, button);
        button.textContent = "Add to cart";
        button.addEventListener("click",function(){
            if(token){
                let obj = {
                    title:ele.title,
                    image:ele.image,
                    type:ele.type,
                    price:ele.price,
                    quantity:1
                }
                console.log(obj);
                addToCart(obj)
            }else{
                swal.fire({
                    title: "Please Login First",
                    icon: "Warning",
                })
                setTimeout(() => {
                    window.location.href = "login.html"
                }, 3000)
            }
            
        })

        let div2 = document.createElement("div");
        div2.setAttribute("class", "product-info");

        let h2 = document.createElement("h2");
        h2.textContent = ele.type;
        h2.setAttribute("class","product-brand")

        let p = document.createElement("p");
        p.textContent = ele.title;
        p.setAttribute("class", "product-short-description")

        let span2 = document.createElement("span");
        span2.textContent = ele.price
        span2.setAttribute("clas","price");
        div2.append(h2, p, span2);

        main.append(div1, div2)
        
        product_main.append(main);
        
    })
}

document.querySelector(".veg").addEventListener("click",()=>{
    window.location.assign("./html/veg.html");
})
document.querySelector(".nonveg").addEventListener("click",()=>{
    window.location.assign("./html/non-veg.html");
})
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