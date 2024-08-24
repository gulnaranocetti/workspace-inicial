function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}



document.getElementById("button").addEventListener("click", function() {
    event.preventDefault();
    const usuario = document.getElementById("login").value.trim();
    const password = document.getElementById("password").value.trim();
    
    if (usuario === "" || password === "") {
        showAlertError();
        return;
    }
    
    // Simular la autenticación correcta y guardar la sesión
    localStorage.setItem("userLoggedIn", true); // Guardar la sesión como iniciada 
    // Redirigir a la página principal
    window.location.href = "index.html";
})
