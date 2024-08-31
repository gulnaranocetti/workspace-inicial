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
    // Manejo de la visualización del nombre de usuario
    let storedValue = localStorage.getItem("userLoggedIn");
    let logged = storedValue === 'true';
  
    if (logged) {
      // Mostrar el nombre del usuario y ocultar el botón de iniciar sesión
      const userName = localStorage.getItem("userName");
      document.getElementById("user-name").textContent = userName;
      document.getElementById("user-name").href = "#"; // Opcional: agregar un enlace al perfil del usuario
      document.getElementById("logout-button").style.display = "inline"; // Mostrar botón de cerrar sesión
      document.getElementById("logout-button").addEventListener("click", function() {
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("userName");
        window.location.href = "login.html";
      });
    } else {
      // Ocultar nombre de usuario y mostrar el botón de iniciar sesión
      document.getElementById("user-name").textContent = "";
      document.getElementById("logout-button").style.display = "none";
    }
    
    // Manejo del clic en las tarjetas de categoría
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
  