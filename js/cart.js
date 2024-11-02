
// Función para agrupar los productos en función de su nombre
function groupCartItems(cartItems) {
  const groupedItems = {};
  cartItems.forEach(item => {
      const productName = item.selectedproducts.name;
      if (groupedItems[productName]) {
          groupedItems[productName].quantity += 1;
      } else {
          groupedItems[productName] = { ...item, quantity: 1 };
      }
  });
  return Object.values(groupedItems);
}

// Función para mostrar los productos en el carrito
function showCartItems(cartItems) {
  const groupedCartItems = groupCartItems(cartItems); // Asegurarse de que estén agrupados
  let htmlContentToAppend = "";

  groupedCartItems.forEach((item, index) => {
      const subtotal = item.selectedproducts.cost * item.quantity; // Cambio: Calcula el subtotal por producto basado en la cantidad
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
            <input id="quantity-${index}" min="1" name="quantity" value="${item.quantity}" type="number"
              class="form-control form-control-sm" onchange="updateSubtotal(${index})" />
            <button class="btn btn-link px-2" onclick="updateQuantity(${index}, 1)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="col-md-2 col-lg-2 col-xl-2 text-end">
            <h6 class="mb-0" id="subtotal-${index}">Subtotal: ${item.selectedproducts.currency} ${subtotal}</h6>
          </div>
          <div class="col-md-1 col-lg-1 col-xl-1 text-end">
            <a href="#!" class="text-muted" onclick="borrarProducto(${index})"><i class="fas fa-times"></i></a>
          </div>
        </div>
      `;
  });
  document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
  updateTotal(groupedCartItems); // Cambio: Actualizar el total después de mostrar los productos agrupados
}

// Función para actualizar la cantidad de un producto
function updateQuantity(index, change) {
  const quantityInput = document.getElementById(`quantity-${index}`);
  let newQuantity = parseInt(quantityInput.value) + change;
  if (newQuantity < 1) newQuantity = 1;
  quantityInput.value = newQuantity;
  updateSubtotal(index);
  updateCartCount();
}

// Función para actualizar el subtotal y total general
function updateSubtotal(index) {
  let cartItems = JSON.parse(localStorage.getItem("PurchasedItems")) || [];
  cartItems = groupCartItems(cartItems); // Cambio: Asegurarse de que los productos estén agrupados antes de actualizar
  const quantity = parseInt(document.getElementById(`quantity-${index}`).value);
  const item = cartItems[index];

  if (item) {
    const subtotal = item.selectedproducts.cost * quantity; // Cambio: Calcula el subtotal basado en la cantidad actual
    document.getElementById(`subtotal-${index}`).innerText = `Subtotal: ${item.selectedproducts.currency} ${subtotal}`;
    item.quantity = quantity; // Almacena la cantidad actualizada en el localStorage
    localStorage.setItem("PurchasedItems", JSON.stringify(cartItems)); // Cambio: Guarda la cantidad actualizada en localStorage
    updateTotal(cartItems); // Recalcula el total general después de actualizar el subtotal
    updateCartCount();
  }
}

// Función para calcular el total general
function updateTotal(cartItems) {
  let total = 0;
  let totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  cartItems.forEach((item) => {
      let subtotal = item.selectedproducts.cost * item.quantity;
      if (item.selectedproducts.currency !== 'UYU') {
          subtotal *= 40; // Cambio: Conversión de moneda si no está en UYU
      }
      total += subtotal; // Acumula el subtotal al total general
  });
  document.getElementById("Total").innerText = `${total} UYU`; // Cambio: Muestra el total en UYU
  document.getElementById("suma-art").innerText = totalQuantity;
}

// Función para eliminar un producto del carrito
function borrarProducto(index) {
  let cartItems = JSON.parse(localStorage.getItem("PurchasedItems")) || [];
  cartItems = groupCartItems(cartItems); // Cambio: Agrupa los productos antes de eliminar
  if (index >= 0 && index < cartItems.length) {
      cartItems.splice(index, 1);
      localStorage.setItem("PurchasedItems", JSON.stringify(cartItems));
      showCartItems(cartItems); // Actualizar la lista de productos después de eliminar
      updateCartCount();
  }
}

// Al cargar el documento, mostrar el carrito si hay productos guardados
document.addEventListener("DOMContentLoaded", function() {
  updateCartCount();
  let cartItems = JSON.parse(localStorage.getItem("PurchasedItems")) || [];
  if (cartItems.length > 0) {
      showCartItems(cartItems); // Cambio: Llama a showCartItems solo si hay productos guardados
  } else {
      document.getElementById("prod-list-container").innerHTML = `
          <div class="alert alert-info text-center" role="alert">
              No hay productos en el carrito.
          </div>
      `;
  }
});

// Función para actualizar el contador del carrito sumando todas las cantidades
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("PurchasedItems")) || [];
  let totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  localStorage.setItem("cart-count", totalQuantity); // Guardar en localStorage
  document.getElementById("cart-count").innerText = totalQuantity; // Actualizar en el badge
}