function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

document.getElementById("button").addEventListener("click", function() {
    event.preventDefault();
    const usuario = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    
    if (usuario === "" || password === "") {
        showAlertError();
        return;
    }
    
    localStorage.setItem("userLoggedIn", true); // Guardar la sesión como iniciada 
    localStorage.setItem("username", usuario);
    // Redirigir a la página principal
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: usuario, password })
        }).then(response => {return response.json()})
        .then(response => {
            localStorage.setItem("token", response.token);
            window.location.href = "index.html";
        })
    
})

document.addEventListener("DOMContentLoaded", function(){
    // Obtiene el valor de localStorage y conviértelo a booleano
  let storedValue = localStorage.getItem("userLoggedIn");
  let logged = storedValue === 'true'; // Será true solo si storedValue es 'true'
  console.log(logged);
})