const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
const RESULTADO_DE_BUSQUEDA = document.querySelector('#cat-list-container');
let busqueda = document.querySelector('#search-input');
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array){
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

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

            htmlContentToAppend += `
            <div class="card productos-item m-2 border" style="width: 17rem;">
                <div class="card-header text-center " >
                    <h5 class="card-title">${category.name}</h5>
                </div>
            <a href="category-info.html"  style="text-decoration:none; color:black;">    
                <img src="${category.imgSrc}" class="card-img-top" alt="...">
            </a>
            <div class="card-body border-top-0 card-description">
                <p class="card-text ">${category.description}</p>
            </div>
            <div class="card-footer">
                <p class="card-text text-primary">${category.productCount} Productos</p>
            </div>

        </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

function buscarProductos(){
    RESULTADO_DE_BUSQUEDA.innerHTML = '';
    const dato = busqueda.value.toLowerCase();
    for(let producto of currentCategoriesArray){
        let titulo = producto.name.toLowerCase();
        let descripcion = producto.description.toLowerCase();
        
        if(titulo.indexOf(dato) !== -1 || descripcion.indexOf(dato) !== -1){
            console.log(titulo)
            RESULTADO_DE_BUSQUEDA.innerHTML +=
            `
            <div class="card productos-item m-3 border-0" style="width: 18rem;">
            <a href="category-info.html"  style="text-decoration:none; color:black;">    
                <img src="${producto.imgSrc}" class="card-img-top" alt="...">
            </a>
            <div class="card-body border bg-light">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">${producto.description}</p>
                <p class="card-text text-primary border-bottom" style="font-size:1.5em">${producto.productCount}</p>
                
            </div>
        </div>
        `
        }
        
    }
    if(RESULTADO_DE_BUSQUEDA.innerHTML === ''){
        RESULTADO_DE_BUSQUEDA.innerHTML = `<h2> No se encontraron atrículos con esa descripción</p>`
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById('search-input').addEventListener('keyup',buscarProductos);

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

        showCategoriesList();
    });
});
