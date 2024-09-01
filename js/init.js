const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//funcion para cerrar sesion al clickear
document.getElementById("logout-button").addEventListener("click", function() {
  localStorage.removeItem('userLoggedIn');
  let storedValue = localStorage.getItem("userLoggedIn");
  let logged = storedValue === 'true';
  console.log(logged);
  window.location.href = "login.html"
});

document.addEventListener("DOMContentLoaded", function(){
  // Obtén el valor de localStorage y conviértelo a booleano
  let storedValue = localStorage.getItem("userLoggedIn");

  let logged = storedValue === 'true'; // Será true solo si storedValue es 'true'
  console.log(logged);
  if(!logged){
      window.location.href = "login.html";
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Manejo de la visualización del nombre de usuario en la página principal
  let storedValue = localStorage.getItem("userLoggedIn");
  let logged = storedValue === 'true';

  if (logged) {
    // Mostrar el nombre del usuario y el botón de cerrar sesión
    const userName = localStorage.getItem("userName");
    const userNameElement = document.getElementById("user-name");
    const logoutButtonElement = document.getElementById("logout-button");

    if (userNameElement) {
      userNameElement.textContent = userName; // Mostrar nombre de usuario
      userNameElement.href = "#"; // Opcional: agregar un enlace al perfil del usuario
    }

    if (logoutButtonElement) {
      logoutButtonElement.style.display = "inline"; // Mostrar botón de cerrar sesión
      logoutButtonElement.addEventListener("click", function() {
        // Eliminar información de inicio de sesión y redirigir al inicio de sesión
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("userName");
        window.location.href = "login.html";
      });
    }
  } else {
    // Si no está logueado, ocultar el nombre de usuario y el botón de cerrar sesión
    const userNameElement = document.getElementById("user-name");
    const logoutButtonElement = document.getElementById("logout-button");

    if (userNameElement) {
      userNameElement.textContent = "";
    }

    if (logoutButtonElement) {
      logoutButtonElement.style.display = "none"; // Ocultar botón de cerrar sesión
    }
  }

  // Configurar eventos para las tarjetas de categoría
  const categories = ["autos", "juguetes", "muebles"];
  categories.forEach(category => {
    const element = document.getElementById(category);
    if (element) {
      element.addEventListener("click", function() {
        const catID = {
          autos: 101,
          juguetes: 102,
          muebles: 103
        }[category];
        localStorage.setItem("catID", catID);
        window.location = "products.html";
      });
    }
  });
  
});
