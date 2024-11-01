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
      const subtotal = item.selectedproducts.cost;
      updateTotal(cartItems,subtotal);
    });
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    updateTotal(cartItems, subtotal); // Calcula el total inicial
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
    
      updateTotal(cartItems, subtotal); // Recalcula el total general
    }
  }
  
  function updateTotal(cartItems, subtotal) {
    let total = 0;
    cartItems.forEach((item) => {
        if (item.selectedproducts.currency !== 'UYU'){
            subtotal = subtotal * 40;
            total += subtotal;
        }
      
    });
    document.getElementById("Total").innerText = `${total}`;
    document.getElementById("suma-art").innerText = cartItems.length;
  }
  
  function borrarProducto(indice) {
    let cartItems = JSON.parse(localStorage.getItem("PurchasedItems")) || [];
    if (indice >= 0 && indice < cartItems.length) {
      cartItems.splice(indice, 1);
      localStorage.setItem("PurchasedItems", JSON.stringify(cartItems));
      showCartItems(cartItems); // Mostrar de nuevo los elementos
    } 
  }
  
  document.addEventListener("DOMContentLoaded", function(e) {
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
  