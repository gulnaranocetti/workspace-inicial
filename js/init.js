const CATEGORIES_URL = "http://localhost:3000/api/categories";
const PRODUCTS_URL = "http://localhost:3000/api/cats-products/";
const PRODUCT_INFO_URL = "http://localhost:3000/api/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/api/products-comments/";
const CART_INFO_URL = "http://localhost:3000/api/user-cart";
const CART_BUY_URL = "http://localhost:3000/api/cart-info";
const SELL = "http://localhost:3000/api/sell-info";
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
    return fetch(url, {
      headers: {
      'authorization': localStorage.getItem('token')
      }
      })
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
})

document.addEventListener("DOMContentLoaded", function(){

  let cartCount = localStorage.getItem("cart-count");
  document.getElementById("cart-count").innerHTML = cartCount;

  // Obtén el valor de localStorage y conviértelo a booleano
  let storedValue = localStorage.getItem("userLoggedIn");
  let logged = storedValue === 'true'; // Será true solo si storedValue es 'true'
  console.log(logged);
  if(!logged){
      window.location.href = "login.html";
  }

  const userName = localStorage.getItem("username"); // Aquí deberías poner el nombre del usuario

  // Selecciona el elemento del menú desplegable donde se mostrará el nombre del usuario
  const userNameElement = document.getElementById("user-name");

  // Establece el texto del elemento con el nombre del usuario
  if (userNameElement) {
    userNameElement.innerText = userName;
  }
  console.log(userName);

       // Funcionalidad de modo oscuro
      const switchElement = document.querySelector(".switch");

      switchElement.addEventListener("click", function() {
      toggleDarkMode();
      });
      
          function toggleDarkMode() {
              switchElement.classList.toggle("active");
                  document.body.classList.toggle("active");
              saveDarkModeInLS(switchElement.classList.contains("active"));
          }
      
          function saveDarkModeInLS(estado) {
              localStorage.setItem("darkMode", estado);
          }
      
          function keepDarkModeInLS() {
              const savedDarkMode = localStorage.getItem("darkMode") === "true";
                  if (savedDarkMode) {
              switchElement.classList.add("active");
          document.body.classList.add("active");
      }
    }
      
        // Mantener el estado del modo oscuro al cargar la página
          keepDarkModeInLS();
})
