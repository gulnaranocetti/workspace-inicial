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
      document.getElementById("user-name").href = "#"; // Opcional: agregar un enlace al perfil del usuario
      document.getElementById("logout-button").style.display = "offline"; // Mostrar el botón de cerrar sesión
      document.getElementById("logout-button").addEventListener("click", function() {
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("userName");
        window.location.href = "login.html";
      });
    } else {
      // Si no está logueado, mostrar el botón de "Iniciar sesión" y ocultar el botón de cerrar sesión
      document.getElementById("user-name").textContent = "";
      document.getElementById("logout-button").style.display = "none";
    }
  
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
  });
  