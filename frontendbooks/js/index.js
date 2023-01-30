const user = document.getElementById("email");
const pass = document.getElementById("password");
const form = document.getElementById("form");

// -------------------------------------------------------------------------------

form.addEventListener("submit",()=>{
    let usuario = {
        userName:user.value,
        password:pass.value
    }
    localStorage.setItem("user",JSON.stringify(usuario))
})