
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

  const userName = localStorage.getItem("username"); // Aquí deberías poner el nombre del usuario

  // Selecciona el elemento del menú desplegable donde se mostrará el nombre del usuario
  const userNameElement = document.getElementById("user-name");

  // Establece el texto del elemento con el nombre del usuario
  if (userNameElement) {
    userNameElement.innerText = userName;
  }
  console.log(userName);

});





