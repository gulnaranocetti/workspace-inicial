const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COST = "Cost.";
let currentProdArray = [];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;

function sortProd(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COST){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.productCost);
            let bCost = parseInt(b.productCost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setAutoID(id) {
    localStorage.setItem("autoID", id);
     window.location = "product-info.html"
}

function showProdList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProdArray.length; i++){
        let prod = currentProdArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(prod.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(prod.cost) <= maxCost))){

            htmlContentToAppend += `
            <div onclick="setcatID(${prod.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-12">
                        <img src="${prod.image}" alt="${prod.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between my-2">
                            <h4 class="mb-md-1 font-sm-size font-sm-bold">${prod.name}</h4>
                            <h4 class="mb-md-1 font-sm-size">${prod.currency}${" "}${prod.cost}</h4>
                        </div>
                        <p class="text-muted mb-1 col-8 font-sm-size">${prod.description}</p>
                        <small class="text-muted float-end font-sm-size">${prod.soldCount} artículos vendidos</small>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}


function sortAndShowProd(sortCriteria, prodArray){
    currentSortCriteria = sortCriteria;

    if(prodArray != undefined){
        currentProdArray = prodArray;
    }

    currentProdArray = sortProd(currentSortCriteria, currentProdArray);

    //Muestro los productos ordenados
    showProdList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    let catID = localStorage.getItem("catID");
    let productsURL = PRODUCTS_URL + catID + ".json";

    // Llamada para obtener el nombre de la categoría desde el archivo JSON de categorías
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            let categoriesArray = resultObj.data;
            let selectedCategory = categoriesArray.find(cat => cat.id == catID);

            // Actualizamos el título y la descripción de acuerdo a la categoría seleccionada
            document.querySelector(".titulo-lista-productos h2").innerText = selectedCategory.name;
            document.querySelector(".titulo-lista-productos p").innerText = selectedCategory.description;
        }
    });

    getJSONData(productsURL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProdArray = resultObj.data.products

            showProdList()
            //sortAndShowProd(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProd(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProd(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCost").addEventListener("click", function(){
        sortAndShowProd(ORDER_BY_PROD_COST);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProdList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        //de cada productos.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProdList();
    });
});