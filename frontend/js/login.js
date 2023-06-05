
var mail = document.querySelector("#mail").value;
var pass1 = document.querySelector("#pass1").value;


function submit2(){
    let obj = {
        email:document.querySelector("#mail").value,
        password:document.querySelector("#pass1").value
    } 
    if(obj.email!=="" && obj.password!==""){
        fetch("http://localhost:7000/users/login", {
            method:"POST",
            headers: {
                "content-type":"application/json"
            },
            body:JSON.stringify(obj)
    
        }).then((res) => {
            return res.json();
        }).then((data) => {
            localStorage.clear();
            if(data.msg=="Wrong password"){
                swal.fire({
                    title: "Wrong password",
                    icon: "warning",
                })
            }else if(data.msg=="user not registered"){
                swal.fire({
                    title: "User is not registered",
                    icon: "warning",
                })
                setTimeout(()=>{
                    window.location.href = "sign.html"
                },3000)
            }else{
                localStorage.setItem("token",data.token)
                localStorage.setItem("id",data.result);
                localStorage.setItem("name",data.name);
    
    
                swal.fire({
                    title: "login successfull",
                    icon: "success",
                })
                setTimeout(()=>{
                    window.location.href = "../index.html"
                },5000)
            }
            
           
            
        }).catch((err) => {
            swal.fire({
                title: "User is not registered",
                icon: "warning",
            })
            setTimeout(()=>{
                window.location.href = "sign.html"
            },3000)
        })
    }else{
        alert("fill all the details")
    }

        
    
    
    
}