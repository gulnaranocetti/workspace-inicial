

document.addEventListener("DOMContentLoaded", function(){
    // Obtiene el valor de localStorage y conviértelo a booleano
  let storedValue = localStorage.getItem("userLoggedIn");
  let logged = storedValue === 'true'; // Será true solo si storedValue es 'true'
  console.log(logged);
})
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("button").addEventListener("click", function(event) {
      event.preventDefault();
      
      const usuario = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      
      if (usuario === "" || password === "") {
        showAlertError();
        return;
      }
      
      // Guarda el nombre de usuario en localStorage
      localStorage.setItem("userLoggedIn", true);
      localStorage.setItem("userName", usuario); // Guarda el nombre de usuario
      
      // Redirige a la página principal
      window.location.href = "index.html";
    });
  });
  
  function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
  }
  