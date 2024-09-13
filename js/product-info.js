document.addEventListener("DOMContentLoaded", function(e) {
    let prodID = localStorage.getItem("prodID");
    let productsURL = PRODUCT_INFO_URL + prodID + ".json";
    if (!prodID) {
        console.error("Product ID is not found in local storage.");
        return;
    }

    getJSONData(productsURL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            let selectedproducts = resultObj.data;

            // Actualizamos el título del producto
            document.querySelector(".text-center.display-8").innerText = selectedproducts.name;
            
            // Mostrar el precio del auto y la moneda
            document.querySelector(".productCost strong").innerText = `${selectedproducts.currency} ${selectedproducts.cost}`;
            
            // Mostrar la cantidad de artículos vendidos
            document.querySelector(".vendidos").innerText = `PRODUCTOS VENDIDOS: ${selectedproducts.soldCount}`;

            // Mostrar la descripción del producto
            document.querySelector(".ProductDescription").innerText = selectedproducts.description;

        }
    });
});