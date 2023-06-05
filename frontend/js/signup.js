const form = document.querySelector("#signupform");

form.addEventListener("click", (e) => {
    e.preventDefault();
    let obj = {
        name: document.querySelector(".name").value,
        email: document.querySelector(".email").value,
        password: document.querySelector(".password").value
    }
    if (obj.name !== "" && obj.email !== "" && obj.password !== "") {
        fetch("http://localhost:7000/users/register", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)

        }).then((res) => {
            return res.json();
        }).then((data) => {

            console.log(data);
            swal.fire({
                title: "User registered successfully",
                icon: "success",
            })
            window.location.assign("../html/login.html")

        })



    }

})
