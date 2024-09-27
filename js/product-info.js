let commentsArray = [];

function showCommentsList(){
    let htmlContentToAppend = "";
    const maxStars = 5; // Número máximo de estrellas que se puede mostra

    for(let i = 0; i < commentsArray.length; i++){
        let comment = commentsArray[i];

        // Generar estrellas llenas y vacías según el valor numberrange
        let stars = "";
        // Estrellas rellenas
        for (let j = 0; j < comment.score; j++) {
            stars += `<i class="bi bi-star-fill"></i>`; // Estrella rellena
        }
        // Estrellas vacías hasta completar el máximo
        for (let j = comment.score; j < maxStars; j++) {
            stars += `<i class="bi bi-star"></i>`; // Estrella vacía
        }

        htmlContentToAppend += `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title"> ${comment.user}</h5>
                <p class="card-text">${comment.description}</p>
                <div>${stars}</div>
            </div>
        </div>
        `
    }
    document.getElementById("comments-list-container").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e) {
    let prodID = localStorage.getItem("prodID");
    let productsURL = PRODUCT_INFO_URL + prodID + EXT_TYPE;
    let commentsURL = PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE;

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

            // Mostrar la categoría del producto
            document.querySelector(".ProductCategory").innerText = selectedproducts.category;

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
                imgElement.className = "img-fluid zoom col-2";
                imageContainer.appendChild(imgElement);
            });
        }
    });

    getJSONData(commentsURL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
            showCommentsList();
        }
    })
});
