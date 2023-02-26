

const btn = document.querySelector("form");

const token = localStorage.getItem("token");
const id = localStorage.getItem("id");

const getData = () => {
    fetch(`https://shy-ruby-caiman-vest.cyclic.app/cart/${id}`, {
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




btn.addEventListener("submit", () => {
    
    if (form.name&& form.lastname && form.address&& form.country && form.city && form.pincode && form.number && form.email ) {
        alert("order placed successfully");
        window.location.assign("../html/index.html");
    } else {
        alert("please fill all the details");
    }
})

