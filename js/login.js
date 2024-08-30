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
    
    // Redirigir a la página principal
    window.location.href = "index.html";
})

document.addEventListener("DOMContentLoaded", function(){
    // Obtiene el valor de localStorage y conviértelo a booleano
  let storedValue = localStorage.getItem("userLoggedIn");
  let logged = storedValue === 'true'; // Será true solo si storedValue es 'true'
  console.log(logged);
})