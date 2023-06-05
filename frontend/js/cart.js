window.onload = function () {
    const hambtn1 = document.querySelector("#ham-nav");
    const hambtn = document.querySelector(".hamburger");
    hambtn.addEventListener("click", () => {
        hambtn.classList.toggle("is-active");
        hambtn1.classList.toggle("is-active");
    })
}
let main = document.querySelector('.likeshow')
let namee = document.querySelector("#login");
let n = localStorage.getItem("name");
if (n) {
    namee.innerHTML = "";
    let h1 = document.createElement("h1");
    h1.innerText = n;
    let h2 = document.createElement("h1");
    h2.innerText = "Logout"
    h2.addEventListener("click", (e) => {

        localStorage.clear();
    })

    let h3 = document.createElement("h1");
    h3.innerText = "||"
    namee.append(h1, h3, h2);
}

const token = localStorage.getItem("token");
const id = localStorage.getItem("id");
console.log(id);

const getData = () => {
    fetch(`http://localhost:7000/cart/${id}`, {
        method: "GET",

        headers: {
            "Authorization": token
        }

    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data.msg);
        if (data.msg.length > 0) {
            document.querySelector("#checkbtn").addEventListener("click", () => {
                window.location.assign("./checkout.html");
            })
            displayTable(data.msg);
        }



    })

}
getData()




function displayTable(data) {
    const total = document.querySelector("#total");
    let num = 0;
    total.innerHTML = "";
    main.innerHTML = "";
    

    data.forEach((el, index) => {
        let qnum = el.quantity;

        let div = document.createElement('div');


        let img = document.createElement('img');
        img.src = el.image;

        let div2 = document.createElement('div');
        let p = document.createElement('h3');
        p.innerHTML = el.title;

        let price = document.createElement('h3');
        price.innerHTML = `<i class="fa-solid fa-rupee-sign"></i> ${el.price} `;
        num+= Number(el.price) *Number(el.quantity);
        div2.append(p, price)
        let div3 = document.createElement('div');
        let btn1 = document.createElement("button");
        btn1.innerText = "+"
        btn1.addEventListener("click", (e) => {
            qnum++;
            qty.innerText = qnum;
            console.log("click");
            num+= Number(el.price) * qnum;
            let a ={
                quantity:qnum
            }
            fetch(`http://localhost:7000/cart/${el._id}`,{
                method:"PATCH",
                headers:{
                    "content-type":"application/json",
                    Authorization: token
                },
                body:JSON.stringify(a)
            })
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                console.log(data)
                getData();
            })
            .catch((err)=>{
                console.log(err.message);
            })
        })
        let qty = document.createElement("p");
        qty.innerText = el.quantity;
        let btn2 = document.createElement("button");
        btn2.innerText = "-";
        btn2.addEventListener("click", (e) => {
            if (qnum !== 1) {
                qnum--;
                qty.innerText = qnum;
                console.log("click");
                let a ={
                    quantity:qnum
                }
                fetch(`http://localhost:7000/cart/${el._id}`,{
                    method:"PATCH",
                    headers:{
                        "content-type":"application/json",
                        Authorization: token
                    },
                    body:JSON.stringify(a)
                })
                .then((res)=>{
                    return res.json();
                })
                .then((data)=>{
                    console.log(data)
                    getData();
                })
                .catch((err)=>{
                    console.log(err.message);
                })
                
            }

        })

        div3.append(btn1, qty, btn2);


        let btn = document.createElement('button');
        btn.innerHTML = `<i class="fa-solid fa-trash"></i>`
        btn.addEventListener("click", () => {
            deletefunction(el._id);
        })


        div.append(img, div2, div3, btn)
        if (index % 2 == 0) {
            div.style.backgroundColor = '#fff4f3';
        } else {
            div.style.backgroundColor = 'red';
        }
        main.append(div);


    })
    total.append(num);
}

function deletefunction(id) {
    fetch(`http://localhost:7000/cart/${id}`, {
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

