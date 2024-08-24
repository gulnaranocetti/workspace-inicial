const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentAutosArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortAutos(criteria, array){
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
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setAutoID(id) {
    localStorage.setItem("autoID", id);
}

function showAutosList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentAutosArray.length; i++){
        let autos = currentAutosArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(autos.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(autos.soldCount) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setAutoID(${autos.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${autos.image}" alt="${autos.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${autos.name}</h4>
                            <h4 class="mb-1">${autos.currency}${" "}${autos.cost}</h4>
                        </div>
                        <p class="mb-1">${autos.description}</p>
                    </div>
                    <small class="text-muted right">${autos.soldCount} artículos vendidos</small>
                </div>
            </div>
            `
        }

        document.getElementById("autos-list-container").innerHTML = htmlContentToAppend;
    }
}


function sortAndShowAutos(sortCriteria, autosArray){
    currentSortCriteria = sortCriteria;

    if(autosArray != undefined){
        currentAutosArray = autosArray;
    }

    currentAutosArray = sortAutos(currentSortCriteria, currentAutosArray);

    //Muestro las categorías ordenadas
    showAutosList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(AUTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentAutosArray = resultObj.data.products

            showAutosList()
            //sortAndShowAutos(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowAutos(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowAutos(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowAutos(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showAutosList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showAutosList();
    });
});