

let slideshow = document.querySelector("#slideshow>img");

let img = ["https://www.elpolloloco.com/content/img/hero/M2-2022-Family-Feast-Hero-Tablet-1536x1120.webp", "https://www.elpolloloco.com/content/img/hero/M4-2022-Combos-Hero-Tablet-1536x1120.webp", "https://www.elpolloloco.com/content/img/hero/M3-2021-Team-2-Hero-Tablet-1536x1120.webp", "https://www.elpolloloco.com/content/img/hero/M5-Free-Chips-Hero-Tablet-1536x1120.webp", "https://www.elpolloloco.com/content/img/hero/M1-2023-Grillers-Hero-Tablet-1536x1120.webp"];


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
    fetch("http://localhost:9074/fooditem/", {

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
        button.textContent = "Add to wishlist";
        button.addEventListener("click",function(){
            alert(`${ele.title} is added to Wishlist`)
            let bookd = JSON.parse(localStorage.getItem("wish"))||[];
            let a = ele;
            a.price = Math.floor(Math.random()*1000)
            bookd.push(a);
            localStorage.setItem("wish",JSON.stringify(bookd));
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

