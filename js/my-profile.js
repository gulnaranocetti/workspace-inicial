  document.addEventListener("DOMContentLoaded", function(){
    // Obtén el valor de localStorage y conviértelo a booleano
    let storedValue = localStorage.getItem("userLoggedIn");
    let logged = storedValue === 'true'; // Será true solo si storedValue es 'true'
    console.log(logged);
    if(!logged){
        window.location.href = "login.html";
    }
  
    const userName = localStorage.getItem("username"); // Aquí obtiene el nombre del usuario
  
    // Selecciona el encabezado donde se mostrará el mensaje seguido del nombre de usuario
    const userNameElement = document.getElementById("welcome-message");
    const emailField = document.getElementById("email"); 
  
    // Establece el texto del elemento con el nombre del usuario
    if (userNameElement) {
      userNameElement.innerText = `Bienvenido/a ${userName}!`;
    }
    console.log(userName);

    if (emailField) {
      emailField.value = userName;
    }

  })





