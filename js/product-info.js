
//arrays
let arrayProductos=[];
let arrayComentarios=[];
let productosRelacionados=[]

// variables con contenido para mostrar en html
let htmlMensajes='';
let hmtlImageContent=''; 
let MensajesNuevos='';
let productosRelacionadosParaMostrar = '';  

//constante para indicar el maximo de estrellas que puede tener la valoracion
const estrellasTotales = 5;


    //SE RECORRE ARRAY DE COMENTARIOS Y RENDERIZAN
    function mostrarMensajes(array){
        
         for(let mensaje of array){
           htmlMensajes+=`
                <div class="border rounded p-2 ${mensaje.user}">
                    <div style = 'max-width:120px' class="text-center">
                        <div class="estrellas shadow-sm" id="estrellas" ></div>
                    </div>    
                    <p class="font-weight-bolder mt-3">${mensaje.user}</p>
                    <p>${mensaje.description}</p>
                    <p><small>${mensaje.dateTime}</small></p>
                </div>
            `
        }
       
        document.getElementById('comentario').innerHTML = htmlMensajes;
    }

    //SE RECORRRE ARRAY DE COMENTARIOS Y ASIGNA VALORACION CORRESPONDIENTE
    function mostrarValoracion(array){
            
            for(let estrellas of array){
                let valor = Number(estrellas.score)
                console.log(valor);
                document.querySelector(`.${estrellas.user} .estrellas`).innerHTML =`<span class="fa fa-star checked"></span>`.repeat(valor) ;
                document.querySelector(`.${estrellas.user} .estrellas`).innerHTML +=`<span class="fa fa-star"></span>`.repeat((estrellasTotales) - valor) ;
            }
           
    }

    
  
  
    document.addEventListener("DOMContentLoaded", function(e){ 
    //SE CARGA EL PRODUCTO
        getJSONData(PRODUCT_INFO_URL).then(function(resultados){
            if(resultados.status==='ok'){
                arrayProductos = resultados.data;
                
            }
            else{
                alert('El contenido no se esta cargando')
            }

        let nombre = document.getElementById('titulo-producto');
        let descripcion = document.getElementById('descripcion-producto');
        let categoria = document.getElementById('categoria-producto');
        let vendidos = document.getElementById('vendidos');
        let precio = document.getElementById('precio-producto');
        
        nombre.innerHTML = arrayProductos.name;
        descripcion.innerHTML = arrayProductos.description;
        categoria.innerHTML =` ${arrayProductos.category}`;    
        vendidos.innerHTML =`Unidades vendidas: ${arrayProductos.soldCount}`;
        precio.innerHTML =`<span class="font-weight-light">${arrayProductos.currency}</span> ${arrayProductos.cost} ` ;

        for(let items of arrayProductos.images){
            hmtlImageContent +=`
                <img src="${items}" class="img-product-galery" width="200px">
                
            `
        }    
        document.getElementById('img-galery').innerHTML= hmtlImageContent;
        
         //LLAMADO A PRODUCTOS RELACIONADOS
         getJSONData(PRODUCTS_URL).then(function(resultados){
            if(resultados.status==='ok'){
                productosRelacionados=resultados.data;
               loadRelatedProducts()
        }
           
    })
    
    
      
        //FUNCION PARA MOSTRAR PRODUCTOS RELACIONADOS
            function loadRelatedProducts(){
            
                
                for(let items in arrayProductos.relatedProducts){
                    
                    if(productosRelacionados.indexOf(items)){
                        productosRelacionadosParaMostrar +=`
                        <div class="card card-related productos-item link ml-2" style="width: 13rem;">
                            <div class="card-header">${productosRelacionados[items].name}</div>
                            <img src="${productosRelacionados[items].imgSrc}" class="card-img-top img" alt="...">
                            <div class="card-body">
                                <p class="card-text">${productosRelacionados[items].description}</p>
                            </div>
                            <div class="card-footer p-0">
                                <a href="product-info.html" class="btn btn-primary w-100" >Ver</a>
                            </div>
                        </div>
                    `
                    }
                }
                document.getElementById('related-products').innerHTML= productosRelacionadosParaMostrar;
            }
        })
    });
         // SE CARGAN LOS COMENTARIOS
        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultado){
            if(resultado.status==='ok'){
                arrayComentarios = resultado.data;
                mostrarMensajes(arrayComentarios);
                mostrarValoracion(arrayComentarios);
            }else{
                alert('No se cargan elementos')
            }
    
            //FUNCTION PARA RECEPCIONAR COMENTARIOS NUEVOS
            document.getElementById('enviarComentario').addEventListener('click', function(e){
                //valores del formulario
                let nombre = localStorage.getItem('current-user')
                let  mensaje = document.getElementById('inputComent').value;
                let valoracion = parseInt( document.getElementById('inputPuntaje').value);
                let estrellas = `<span class="fa fa-star checked"></span>`.repeat(valoracion);
                let estrellasNegras = `<span class="fa fa-star"></span>`.repeat((estrellasTotales)- valoracion )
                
                //Datos de la fecha y hora
                let dateComent = new Date();
                let fecha = dateComent.getDate() +  '_' + (dateComent.getMonth() + 1) + '_' + dateComent.getFullYear();
                let hourDate = dateComent.getHours() + ':' + dateComent.getMinutes() + ':' + dateComent.getSeconds();
                
                if(nombre != null){
                    MensajesNuevos += `
                    <div class="border rounded p-2">
                        <div class="text-center shadow-sm" style="max-width:120px">
                         ${estrellas}${estrellasNegras}
                         </div>
                        <p class="font-weight-bolder mt-1">${nombre}</p>
                        <p>${mensaje}</p>
                        <p class="${hourDate}"><small>${fecha} ${hourDate}</small></p>
                    </div>
                    `;
                } 
                else{
                    alert('Debes estar registrado para poder dar tu opinion sobre el producto')
                }
               
                 document.getElementById('comentario-nuevo').innerHTML = MensajesNuevos;
                // SE ENVIAN LOS DATO A EL SERVIDOR

                
                var datos = {
                    "score": valoracion,
                    "description": mensaje,
                    "user": nombre.replace(/ /g, ""), // se  eliminan los espacios en blanco para que no de errores al mostrar la valoracion(ya que el user se inserta como clase y si tiene espacios en blanco, da errores al buscar la clase).
                    "dateTime": fecha+ " " + hourDate
                };

                fetch(PRODUCT_INFO_COMMENTS_URL, {
                    method: 'POST',
                    headers: {"Content-type": "application/json"}, 
                    body: JSON.stringify(datos)
                }).then(response => response.json()
                ).then(data => {console.log(data);})
                            })
        })
       


// funcion para flecha de productos relacionados
document.getElementById('btn-arrow').addEventListener('click', ()=>{
    var icon = document.getElementById('flechita-abajo');
    icon.classList.toggle('fa-angle-down');
    icon.classList.toggle('fa-angle-up');

})


