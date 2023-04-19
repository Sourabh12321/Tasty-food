window.onload = function () {
    const hambtn1 = document.querySelector("#ham-nav");
    const hambtn = document.querySelector(".hamburger");
    hambtn.addEventListener("click",()=>{
        hambtn.classList.toggle("is-active");
        hambtn1.classList.toggle("is-active");
    })
}

const token = localStorage.getItem("token");
const id = localStorage.getItem("id");
console.log(id);

const getData = () => {
    fetch(`https://odd-erin-coati-wrap.cyclic.app/cart/${id}`, {
        method: "GET",

        headers: {
            "Authorization": token
        }

    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        if(data.length>0){
            document.querySelector("#checkbtn").addEventListener("click",()=>{
                window.location.assign("./checkout.html");
            })
            displayTable(data);
        }
        
        

    })

}
getData()




function displayTable(data) {
    const total = document.querySelector("#total");
    let num =0;
    total.innerHTML ="";
    
    data.forEach((el, index) => {

        let div = document.createElement('div');


        let img = document.createElement('img');
        img.src = el.image;

        let div2 = document.createElement('div');
        let p = document.createElement('h3');
        p.innerHTML = el.title;

        let price = document.createElement('h3');
        price.innerHTML = `<i class="fa-solid fa-rupee-sign"></i> ${el.price} `;
        num=num+Number(el.price);

        div2.append(p, price)



        let btn = document.createElement('button');
        btn.innerHTML = `<i class="fa-solid fa-trash"></i>`
        btn.addEventListener("click",()=>{
            deletefunction(el._id);
        })

        
        div.append(img, div2, btn)
        if (index % 2 == 0) {
            div.style.backgroundColor = '#fff4f3';
        } else {
            div.style.backgroundColor = 'red';
        }
        document.querySelector('.likeshow').append(div);
        

    })
    total.append(num);
}

function deletefunction(id){
    fetch(`https://odd-erin-coati-wrap.cyclic.app/cart/${id}`, {
        method: "DELETE",

        headers: {
            "Authorization": token
        }

    }).then((res) => {
        window.location.reload();
        return res.json();
        
    }).then((data) => {
        console.log(data);
        

    })

}

