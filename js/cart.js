function showCartItems(cartItems) {
    let htmlContentToAppend = "";
    cartItems.forEach((item, index) => {
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
            <button class="btn btn-link px-2" onclick="updateQuantity(${index}, -1)">
              <i class="fas fa-minus"></i>
            </button>
            <input id="quantity-${index}" min="1" name="quantity" value="1" type="number"
              class="form-control form-control-sm" onchange="updateSubtotal(${index})" />
            <button class="btn btn-link px-2" onclick="updateQuantity(${index}, 1)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="col-md-2 col-lg-2 col-xl-2 text-end">
            <h6 class="mb-0" id="subtotal-${index}">Subtotal: ${item.selectedproducts.currency} ${item.selectedproducts.cost}</h6>
          </div>
          <div class="col-md-1 col-lg-1 col-xl-1 text-end">
            <a href="#!" class="text-muted" onclick="borrarProducto(${index})"><i class="fas fa-times"></i></a>
          </div>
        </div>
      `;
    });
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    updateTotal(cartItems); // Calcula el total inicial
  }
  
  function updateQuantity(index, change) {
    const quantityInput = document.getElementById(`quantity-${index}`);
    let newQuantity = parseInt(quantityInput.value) + change;
    if (newQuantity < 1) newQuantity = 1; // Evitar cantidades menores a 1
    quantityInput.value = newQuantity;
    updateSubtotal(index);
  }
  
  function updateSubtotal(index) {
    let cartItems = JSON.parse(localStorage.getItem("PurchasedItems")) || [];
    const quantity = parseInt(document.getElementById(`quantity-${index}`).value);
    const item = cartItems[index];
    
    if (item) {  // Verifica si el producto aún existe
      const subtotal = item.selectedproducts.cost * quantity;
      document.getElementById(`subtotal-${index}`).innerText = `Subtotal: ${item.selectedproducts.currency} ${subtotal}`;
    
      updateTotal(cartItems); // Recalcula el total general
    }
  }

  function updateTotal(cartItems) {
    let total = 0;
    cartItems.forEach((item, index) => {
        const quantity = parseInt(document.getElementById(`quantity-${index}`).value);
        let subtotal = item.selectedproducts.cost * quantity;

        // Solo multiplica por 40 si la moneda no es UYU
        if (item.selectedproducts.currency !== 'UYU') {
            subtotal *= 40;
        }

        total += subtotal;
    });
    
    // Muestra el total en UYU
    document.getElementById("Total").innerText = `UYU ${total}`;
    document.getElementById("suma-art").innerText = cartItems.length;
}

  // Función para actualizar el contador del carrito
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("PurchasedItems")) || [];
  const cartCount = cartItems.length;
  localStorage.setItem("cart-count", cartCount); // Actualizar en localStorage
  document.getElementById("cart-count").innerText = cartCount; // Actualizar en la página
}
  
  function borrarProducto(indice) {
    let cartItems = JSON.parse(localStorage.getItem("PurchasedItems")) || [];
    if (indice >= 0 && indice < cartItems.length) {
      cartItems.splice(indice, 1);
      localStorage.setItem("PurchasedItems", JSON.stringify(cartItems));
      updateCartCount();
      showCartItems(cartItems); // Mostrar de nuevo los elementos
    } 
  }

  
  document.addEventListener("DOMContentLoaded", function(e) {
    updateCartCount();

    let cartItems = JSON.parse(localStorage.getItem("PurchasedItems"));
    if (cartItems && cartItems.length > 0) {
      showCartItems(cartItems);
    } else {
      document.getElementById("prod-list-container").innerHTML = `
        <div class="alert alert-info text-center" role="alert">
            No hay productos en el carrito.
        </div>
        `;
    }
    });
  