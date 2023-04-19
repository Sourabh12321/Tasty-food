
function submit1(){
    let obj = {
        name:document.querySelector(".name").value,
        email:document.querySelector(".email").value,
        password:document.querySelector(".password").value
    }
    const getData = () => {
        fetch("https://odd-erin-coati-wrap.cyclic.app/users/register", {
            method:"POST",
    
            headers: {
                "content-type":"application/json"
            },
            body:JSON.stringify(obj)
    
        }).then((res) => {
            return res.json();
        }).then((data) => {
            
            console.log(data);
            
            window.location.assign("../html/login.html")
    
        })
    
    }
    getData()


}