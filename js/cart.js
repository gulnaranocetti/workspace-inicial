function showCartItems(cartItems) {
  let htmlContentToAppend = "";
  cartItems.forEach((item, index) => { // Agregar el índice
      htmlContentToAppend += `
          <div class="row mb-4 d-flex justify-content-between align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2">
                  <img src="${item.selectedproducts.images[0]}" alt="${item.selectedproducts.description}" class="img-thumbnail">
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                  <h6 class="mb-0">${item.selectedproducts.name}</h6>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h6 class="mb-0">P/u: ${item.selectedproducts.currency} ${item.selectedproducts.cost}</h6>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                  <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                      onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                      <i class="fas fa-minus"></i>
                  </button>
                  <input id="form1" min="1" name="quantity" value="1" type="number"
                      class="form-control form-control-sm" />
                  <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                      onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                      <i class="fas fa-plus"></i>
                  </button>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                  <a href="#!" class="text-muted" onclick="borrarProducto(${index})"><i class="fas fa-times"></i></a>
              </div>
          </div>
      `;
  });
  document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

function borrarProducto(indice) {
  let cartItems = JSON.parse(localStorage.getItem("PurchasedItems")) || [];
  
  if (indice >= 0 && indice < cartItems.length) {
      // Eliminar el producto del array
      cartItems.splice(indice, 1);
      // Guardar el carrito actualizado en Local Storage
      localStorage.setItem("PurchasedItems", JSON.stringify(cartItems));
      // Volver a mostrar los productos en el carrito
      showCartItems(cartItems);
  } 
}

document.addEventListener("DOMContentLoaded", function(e) {
  // Verificar si hay productos en el carrito
  let cartItems = JSON.parse(localStorage.getItem("PurchasedItems"));

  if (cartItems && cartItems.length > 0) {
      // Llamar a una función para mostrar los productos en el carrito
      showCartItems(cartItems);
  } else {
      // Mostrar un mensaje si el carrito está vacío
      document.getElementById("prod-list-container").innerHTML = `
          <div class="alert alert-info text-center" role="alert">
              No hay productos en el carrito.
          </div>
      `;
  }
});
