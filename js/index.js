
document.addEventListener("DOMContentLoaded", function() {
  let storedValue = localStorage.getItem("userLoggedIn");
  let logged = storedValue === 'true';

  if (logged) {
      const userName = localStorage.getItem("userName");
      document.getElementById("user-name").textContent = userName;
   
      
      document.getElementById("logout-button").style.display = "block"; 
      document.getElementById("logout-button").addEventListener("click", function() {
          localStorage.removeItem("userLoggedIn");
          localStorage.removeItem("userName");
          window.location.href = "login.html";
      });
  } else {
      document.getElementById("user-name").textContent = "Iniciar sesión";
      document.getElementById("user-name").href = "login.html";
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

 // Funcionalidad del switch
 const switchElement = document.querySelector(".switch");
 if (switchElement) {  // Verificar si existe el elemento .switch
 switchElement.addEventListener("click", e => {
 switchElement.classList.toggle("active");
 document.body.classList.toggle("active");
 });
}




