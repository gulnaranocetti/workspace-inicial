document.addEventListener("DOMContentLoaded", function(e) {
    let prodID = localStorage.getItem("prodID");
    let productsURL = PRODUCT_INFO_URL + prodID + EXT_TYPE;

    if (!prodID) {
        console.error("Product ID is not found in local storage.");
        return;
    }

    let commentsURL = PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE;

    getJSONData(commentsURL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
            showCommentsList();
        }
    }) 

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

            //Mostrar boton de comprar
            const comprar = document.createElement("button");
            const btnContainer = document.querySelector(".comprar");

            btnContainer.appendChild(comprar);

            comprar.innerHTML= "Comprar"
            comprar.className= "btn custom-btn"

            comprar.addEventListener("click", () => {
                window.location = "cart.html";
            });
            

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

            const relatedImage = document.getElementById("relatingProducts");

            // Asumiendo que `selectedproducts.relatedProducts` es un array
            const relatedProducts = selectedproducts.relatedProducts; 

            // Limpiar el contenedor antes de agregar las tarjetas
            relatedImage.innerHTML = ''; 

            // Crear una fila para las tarjetas
            const row = document.createElement("div");
            row.className = "row"; // Clase para la fila

            // Iterar sobre cada producto relacionado
            relatedProducts.forEach(product => {
                // Crear un contenedor para la tarjeta
                const col = document.createElement("div");
                col.className = "col-md-6 d-flex justify-content-center"; // Clases para columnas (2 tarjetas por fila)
                
                const card = document.createElement("div");
                card.className = "card"; // Clase para la tarjeta
                card.style.width = "70%"; // Ancho de la tarjeta al 100%

                // Crear el elemento de imagen
                const imgRelated = document.createElement("img");
                imgRelated.src = product.image; // Asignar la fuente de la imagen
                imgRelated.className = "card-img-top "; // Clase para el estilo de imagen
                
                // Crear el cuerpo de la tarjeta
                const cardBody = document.createElement("div");
                cardBody.className = "card-body";

                // Crear el título del producto
                const productName = document.createElement("h5");
                productName.className = "card-title small";
                productName.innerText = product.name; // Asignar el nombre del producto

                const link = document.createElement("button");
                link.innerHTML= "Ver"
                link.className= "btn custom-btn"

                link.addEventListener("click", () => {
                    localStorage.setItem("prodID", product.id);
                    window.location = "product-info.html";
                });
                
                // Agregar elementos al cuerpo de la tarjeta
                cardBody.appendChild(productName);
                cardBody.appendChild(link);
                card.appendChild(imgRelated);
                card.appendChild(cardBody);
                
                // Añadir la tarjeta a la columna
                col.appendChild(card);
                
                // Añadir la columna a la fila
                row.appendChild(col);
            });

            // Añadir la fila al contenedor de productos relacionados
            relatedImage.appendChild(row);
        }
    })       
});

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
        <div class="container card">
            <div class="row dark">
                <h6 class="col">${comment.user}</h6>
                <p class="col">${comment.description}</p>
                <div class="col">${stars}</div>
            </div>
        </div>
        `;
    }
    document.getElementById("comments-list-container").innerHTML = htmlContentToAppend;
}

// Variable para capturar el valor de la calificación por estrellas
let starRating = 0;

// Función para capturar el valor de las estrellas seleccionadas
function capturaValor(estrella) {
    starRating = parseInt(estrella.value); // Guardar el valor de la estrella seleccionada
}

document.getElementById("commentForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Evitar que se recargue la página
    let username = localStorage.getItem("username");

    let newComment = {
        user: username,
        description: document.getElementById("comment").value,
        score: starRating
    };

    // Agregar el nuevo comentario al array
    commentsArray.push(newComment);

    // Actualizar la lista de comentarios
    showCommentsList();

    // Limpiar el formulario
    document.getElementById("commentForm").reset();
    starRating = 0;
});


