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

            // Mostrar la imagen principal del producto
            const mainProductImage = document.getElementById("mainProductImage");
            if (selectedproducts.images[0]) {
                mainProductImage.src = selectedproducts.images[0]; // Usar la primera imagen del JSON como principal
                mainProductImage.alt = selectedproducts.name;  // Agregar un texto alternativo descriptivo
            } else {
                console.error("No se encontró la imagen principal en el JSON.");
            }

            // Mostrar imágenes adicionales del producto
            const imageContainer = document.querySelector(".product-images");
            selectedproducts.images.forEach(image => {
                let imgElement = document.createElement("img");
                imgElement.src = image;
                imgElement.className = "img-fluid zoom col-2";  // Clases de Bootstrap para estilo y diseño
                imageContainer.appendChild(imgElement);
            });
        }
    });
});
