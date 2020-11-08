//CONSTANTES DE CRITERIO DE ORDENAMIENTO, LOS CUALES SE PASARAN COMO PARAMETRO A sortAndShowProdcts 
const ORDEN_ASCENDENTE = 'Menor Precio';
const ORDEN_DESCENDENTE = 'Mayor Precio';
const ORDEN_DESCENDENTE_RELEVANCIA = 'Mas vendidos';

const RESULTADO_DE_BUSQUEDA = document.querySelector('#galeria-productos');
let busqueda = document.querySelector('#search-input');

let productosArray = [];
let ordenDeListado = undefined; 
var precioMinimo = undefined;
var precioMaximo = undefined;

    // FUNCION QUE MUESTRA EL ORDEN SELECCIONADO EN PANTALLA 
function showProductsList(listado){
    let htmlContent = '';

    
    for(let i = 0; i < listado.length; i++){
        let productos = listado[i];

        if (((precioMinimo == undefined) || (precioMinimo != undefined && parseInt(productos.cost) >= precioMinimo)) &&
        ((precioMaximo == undefined) || (precioMaximo != undefined && parseInt(productos.cost) <= precioMaximo))){

        htmlContent += `
        <div class="card productos-item m-3 border-0" style="width: 18rem;">
            <a href="product-info.html"  style="text-decoration:none; color:black;">    
                <img src="${productos.imgSrc}" class="card-img-top" alt="...">
            </a>
            <div class="card-body bg-light">
                <h5 class="card-title">${productos.name}</h5>
                <p class="card-text">${productos.description}</p>
                <p class="card-text text-primary border-bottom" style="font-size:1.5em">${productos.currency} ${productos.cost}</p>
                <p class="card-text text-secondary float-right">Vendidos:${productos.soldCount}</p>
            </div>
        </div>
        `
        document.getElementById('galeria-productos').innerHTML = htmlContent
    }

    }
}



    // Funcion que recepciona el orden seleccionado y envia esos datos a ORDENARPRODUCTOS()
function sortAndShowProducts(orden, array){
    ordenDeListado = orden;

    if(array != undefined){
        productosArray = array;
    }
    // SE PASA COMO PARAMETRO LOS DATOS INGRESADOS EN EL ADDEVENTLISTENER 
    productosArray = ordenarProductos(ordenDeListado, productosArray);
    // ordenarProductos() devuelve ordenado el array
    showProductsList(productosArray);
    //y show productList lo muestra en pantalla
}


/* FUNCION QUE RECIBE COMO PARAMETROS UN CRITERIO Y UN ARRAY */
function ordenarProductos(criterio, array){
    let resultado = [];
    //SI EL CRITERIO COINCIDE CON ALGUNA CONSTANTE DE ORDENAMIENTO SE APLICA SORT() SOBRE EL ARRAY
    if(criterio === ORDEN_ASCENDENTE){
        resultado = array.sort(function(a,b){
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if(aCost < bCost){return -1}
            if(aCost > bCost){return 1}
            return 0;
        })
    }
    if(criterio === ORDEN_DESCENDENTE){
        resultado = array.sort(function(a,b){
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if(aCost > bCost){return -1}
            if(aCost < bCost){return 1}
            return 0;
        })
    }
    if(criterio === ORDEN_DESCENDENTE_RELEVANCIA){
        resultado = array.sort(function(a,b){
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if(aCount > bCount){return -1}
            if(aCount < bCount){return 1}
            return 0;
        })
    }    
    return resultado;
}

/*   FUNCION QUE RECORRE PRODUCTOSARRAY Y FILTRA SEGUN CARACTERES INGRESADOS    */
function buscarProductos(){
    RESULTADO_DE_BUSQUEDA.innerHTML = '';
    const dato = busqueda.value.toLowerCase();
    for(let producto of productosArray){
        let titulo = producto.name.toLowerCase();
        let descripcion = producto.description.toLowerCase();
        
        if(titulo.indexOf(dato) !== -1 || descripcion.indexOf(dato) !== -1){
            console.log(titulo)
            RESULTADO_DE_BUSQUEDA.innerHTML +=
            `
            <div class="card productos-item m-3 border-0" style="width: 18rem;">
            <a href="product-info.html"  style="text-decoration:none; color:black;">    
                <img src="${producto.imgSrc}" class="card-img-top" alt="...">
            </a>
            <div class="card-body bg-light">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">${producto.description}</p>
                <p class="card-text text-primary border-bottom" style="font-size:1.5em">${producto.currency} ${producto.cost}</p>
                <p class="card-text text-secondary float-right">Vendidos:${producto.soldCount}</p>
            </div>
        </div>
        `
        }
        
    }
    if(RESULTADO_DE_BUSQUEDA.innerHTML === ''){
        RESULTADO_DE_BUSQUEDA.innerHTML = `<h2> No se encontraron atriculos con esa descripcion</h2>`
    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultados){
        if(resultados.status === 'ok'){
           sortAndShowProducts(ORDEN_ASCENDENTE, resultados.data)
        }
    })

    /* Eventos de click para filtros y ordenamiento */
    document.getElementById("ordenarAscendente").addEventListener('click', function(){
        sortAndShowProducts(ORDEN_ASCENDENTE)
    });
    document.getElementById("ordenarDescendente").addEventListener('click', function(){
        sortAndShowProducts(ORDEN_DESCENDENTE)
    });
    document.getElementById("ordenarDescendenteRelevancia").addEventListener('click', function(){
        sortAndShowProducts(ORDEN_DESCENDENTE_RELEVANCIA)
    });
    document.getElementById("limpiarRango").addEventListener('click', function(){
        document.getElementById('filtroRangoMinimoNum').value = "";
        document.getElementById('filtroRangoMaximoNum').value = "";

        precioMinimo = undefined;
        precioMaximo = undefined;

showProductsList(productosArray);
    });
    
    document.getElementById('search-input').addEventListener('input',buscarProductos)


    /* Funcion para filtrar por precio */
    document.getElementById("filtrarResultados").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        precioMinimo = document.getElementById("filtroRangoMinimoNum").value;
        precioMaximo = document.getElementById("filtroRangoMaximoNum").value;

        if ((precioMinimo != undefined) && (precioMinimo != "") && (parseInt(precioMinimo)) >= 0){
            precioMinimo = parseInt(precioMinimo);
        }
        else{
            precioMinimo = undefined;
        }

        if ((precioMaximo != undefined) && (precioMaximo != "") && (parseInt(precioMaximo)) >= 0){
            precioMaximo = parseInt(precioMaximo);
        }
        else{
            precioMaximo = undefined;
        }

        showProductsList(productosArray)
    });

  
});

