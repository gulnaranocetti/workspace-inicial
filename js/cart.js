function showCartItems(cartItems) {
    let htmlContentToAppend = "";
    cartItems.forEach(item => {
        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-12">
                        <img src="${item.selectedproducts.images[0]}" alt="${item.selectedproducts.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <h4>${item.selectedproducts.name}</h4>
                        <p>${item.selectedproducts.currency} ${item.selectedproducts.cost}</p>
                        <small class="text-muted">${item.selectedproducts.soldCount} vendidos</small>
                    </div>
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
