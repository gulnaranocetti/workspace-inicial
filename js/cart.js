function showCartItems(cartItems) {
    let htmlContentToAppend = "";
    cartItems.forEach(item => {
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
                      <input id="form1" min="0" name="quantity" value="1" type="number"
                        class="form-control form-control-sm" />
                      <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
        `;
    });
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
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
