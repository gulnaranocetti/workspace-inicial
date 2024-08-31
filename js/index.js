
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
});





