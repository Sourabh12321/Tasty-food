
var mail = document.querySelector("#mail").value;
var pass1 = document.querySelector("#pass1").value;


function submit2(){
    let obj = {
        email:document.querySelector("#mail").value,
        password:document.querySelector("#pass1").value
    } 
    
    const getData = () => {
        fetch("https://shy-ruby-caiman-vest.cyclic.app/users/login", {
            method:"POST",
    
            headers: {
                "content-type":"application/json"
            },
            body:JSON.stringify(obj)
    
        }).then((res) => {
            return res.json();
        }).then((data) => {
            localStorage.clear();
            console.log(data);
            localStorage.setItem("token",data.token)
            localStorage.setItem("id",data.result);
            window.location.assign("../html/index.html")
            
        }).catch((err) => {
            alert("user not registered")
        })
    
    }
    getData()


}