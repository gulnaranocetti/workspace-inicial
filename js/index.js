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

document.addEventListener("DOMContentLoaded", function(){
    // Obtén el valor de localStorage y conviértelo a booleano
    let storedValue = localStorage.getItem("userLoggedIn");
    let logged = storedValue === 'true'; // Será true solo si storedValue es 'true'
    console.log(logged);
    if(!logged){
        window.location.href = "login.html";
    }
})