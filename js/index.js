
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
});
document.addEventListener("DOMContentLoaded", function() {
    let storedValue = localStorage.getItem("userLoggedIn");
    let logged = storedValue === 'true';
    if (logged) {
      // Mostrar el nombre del usuario en lugar del enlace de "Iniciar sesión"
      const userName = localStorage.getItem("userName");
      document.getElementById("user-name").textContent = userName;
      document.getElementById("logout-button").style.display = "offline"; // Mostrar el botón de cerrar sesión
      document.getElementById("logout-button").addEventListener("click", function() {
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("username");
        window.location.href = "login.html";
      });
    } else {
    
      document.getElementById("user-name").textContent = "Iniciar sesión";
        document.getElementById("user-name").href = "login.html";
        document.getElementById("logout-button").style.display = "none"; 
    }
});

    // Manejo de la visualización de las tarjetas de categoría
    document.getElementById("autos").addEventListener("click", function() {
      localStorage.setItem("catID", 101);
      window.location = "products.html";
    });
    document.getElementById("juguetes").addEventListener("click", function() {
      localStorage.setItem("catID", 102);
      window.location = "products.html";
    });
    document.getElementById("muebles").addEventListener("click", function() {
      localStorage.setItem("catID", 103);
      window.location = "products.html";
    });
  