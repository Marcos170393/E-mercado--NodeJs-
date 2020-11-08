let cartContent= [];//array cargado a travez del json
var htmlContent='';//contenido del carrito
var state =[];//estado de los articulos, donde se guarda un id y su valor (el total por articulo, segun su precio y cantidad)
var itemsTotales = 0; // Para mostrar cuantos articulos se agregaron al carrito
var buyCost= 0; // costo de la compra para productos obtenidos por json
var shippingSelected = 0;//porcentaje para calcular el envio
var shipping = 0;//valor del envio
var payMetodSelected; //variable para indicar que se selecciono un metodo de pago
var creditPayment; //  constante para indicar que se selecciono credito

//contenedor para el alert
var alerta = document.createElement('div');
    document.body.appendChild(alerta);

//funcion que solo se ejecuta cuando carga el carrito
function calcularCosto(costo, cantidad){
  
    buyCost += costo * cantidad;
    //desglose del precio
    var costoConIva = buyCost;
    var costoSinIva = Math.floor(costoConIva / 1.22) ;
    var  ivaAmount = Math.floor(costoConIva - costoSinIva) 
    //Fin desglose del precio

    document.getElementById('withOutTax').innerHTML =`$ ${costoConIva}`;;
    document.getElementById('tax').innerHTML =`$ ${ivaAmount}`;
    document.getElementById('total-cost').innerHTML =`$ ${costoConIva}`;
    document.getElementById('items-count').innerHTML=`${itemsTotales}`;
}

//se calcula el nuevo costo, con la cantidad modificada
function calcularNuevoCosto(costo, id){
      var countItem = Number(document.getElementById(id).value);// se accede al elemento dom que fue modificado y extrae el value
      var monto = costo * countItem
      var total = 0;
      var itemUpDate = document.querySelector(`td[name='${id}']`) // casilla del table donde se muestra el subTotal por articulos
    for(let item of state){ // recorre el array de estados, y si el id del input coincide con algun elemento del array...
       
        if(item.id === id){
           item.total = monto; //...le asigna el nuevo precio total a ese elemento
           itemUpDate.innerHTML = '$ ' + item.total;
        }
        total += item.total; // vuelve a sumar el subtotal con todos los montos del array
        var totalDelaCompra = total + shipping 
        buyCost = total;
    }
    calcularEnvio(shippingSelected)
    var costoSinIva = Math.floor(total / 1.22) ;
    var ivaAmount = Math.floor(total - costoSinIva);
        document.getElementById('withOutTax').innerHTML =`$ ${total}` ;
        document.getElementById('tax').innerHTML =`$ ${ivaAmount}` ;
        document.getElementById('total-cost').innerHTML =`$ ${totalDelaCompra}`;
    }
      
        //Funcion para calcular el costo de envio en base al total de productos.
    function calcularEnvio(percent){
        //percent es un real
        shippingSelected = percent;
        shipping = Math.floor(buyCost * percent);
        var totalConEnvio = buyCost + shipping;

        document.getElementById('total-cost').innerHTML="$ " + totalConEnvio;
        document.getElementById('shipping').innerHTML="$ " + shipping;
}

    // FUNCION QUE ELIMINA LOS ARTICULOS
    function deleteItem(item){
        cartContent.articles.splice(item, 1);
        //se resetean valores del carrito para que se calculen en base al estado actual.
        console.log(cartContent);
        itemsTotales = 0;
        state = [];
        buyCost = 0;
        // llamamos nuevamente a mostrarProductos para que recorra otra vez el array y muestre resultados
        mostrarProductos();
        //llamamos a calcularEnvio con el estado actual de shippingSelected como parametro, para recalcular el costo de envio.
        calcularEnvio(shippingSelected);
    }

    function mostrarProductos(){
        var contadorId = 0; // contador para asignar id dinamicos a cada articulos
        var contadorArray = -1; // contador para poder eliminar articulos
        htmlContent = '';

        if(cartContent.articles.length > 0) {
            for(let article of cartContent.articles){
            
                itemsTotales+=1; // cantidad de prouctos en el carrito
                contadorId += 1;
                contadorArray += 1;
    
                var subTotal = article.unitCost * article.count 
                var precioEnPesos = parseInt(article.unitCost)
                
                if(article.currency == 'USD'){ //si la moneda del precio es dolares, se hace la conversion a pesos.
                    precioEnPesos = article.unitCost * 40
                    subTotal *= 40
                }
                calcularCosto(precioEnPesos, article.count)
                state.push({"id":contadorId, "total":subTotal }) //se incertan los datos del articulo en el array
                
    
                htmlContent += `
                
                        <tr class="border-bottom">
                            <td class="text-left ">
                                <img src="${article.src}" alt="" class="img-fluid d-none d-md-block rounded shadow-sm" style="width:10em"></td>
                            <td data-th="Product">
                                <p class="font-weight-lighter">${article.name}</p>
                            </td>
                            <td data-th="Precio" class="font-weight-lighter">${article.currency}</td>
                            <td data-th="Precio" class="font-weight-lighter">${article.unitCost}</td>
                            <td data-th="Cantidad">
                                <input id="${contadorId}" type="number" class="form-control form-control-lg text-center border-0" onInput="calcularNuevoCosto(${precioEnPesos}, ${contadorId})"  value="${article.count}" min="1">
                            </td>
                            <td name="${contadorId}">$ ${subTotal}</td>
                            <td class="actions" data-th="">
                                <div class="text-right">
                                    <button class="btn btn-white btn-md text-danger font-weight-lighter" onclick="deleteItem(${contadorArray})">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                        </svg>
                                   
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `
                }
        } else {
            calcularCosto(0,0);
            document.getElementById('shipping').innerHTML="$ " + 0;
        }
        //se despliegan resultados
        document.getElementById('table-cart').innerHTML = htmlContent;
        
    }

    //........

        //FUNCION QUE CARGA LOS ARTICULOS
    //........
    getJSONData(CART_INFO_URL_PROPIO).then(function(result){
        if(result.status === 'ok'){
            cartContent = result.data;
            
        }else{
            console.log('error');
        }
        mostrarProductos();
        console.log(state)
    });
   

    // Funcion que muestra alertas
    function payMetod(metodo){

        let container = document.getElementById('form-dynamic')
        
        if(metodo == "efectivo"){
            container.innerHTML = `
                <label class="text-info"> Podrá realizar su pago en efectivo por medio de las siguientes redes de cobranza</label>
                <select class="form-control" required>
                    <option>Abitab</option>
                    <option>Red Pagos</option>
                </select>
                <small class="mt-1">Al completar el proceso de compra, se le brindaran los datos necesarios para acudir a su local de pagos mas conveniente.</small>
            `
            document.getElementById('paymentMetod').innerHTML="Efectivo";
        }
        if(metodo == "credito"){
        creditPayment = "credito"; // variable que se va a utilizar para validar formulario de metodo de pago credito
            container.innerHTML = `
                <select class="form-control my-1">
                    <option>Visa</option>
                    <option>Master Card</option>
                    <option>American Express</option>
                    <option>OCA</option>
                </select>

                <label>Numero de tarjeta</label>
                <input id="card-num" name="inputTarjeta" class="form-control" placeholder="xxxx-xxxx-xxxx-xxxx">

                <label class="mt-1">Fecha de vencimiento</label>
                <input id="card-date" name="inputTarjeta" class="form-control" type="number" placeholder="mes/año">

                <label class="mt-1">Codigo</label>
                <input id="card-key" name="inputTarjeta" class="form-control" type="number" placeholder="xxx">
            `
            document.getElementById('paymentMetod').innerHTML="Crédito"
            return creditPayment;
        }
        if(metodo == "transferencia"){
            creditPayment = "transferencia"
            container.innerHTML = `
            <p class="mt-1 text-info">Seleccione el banco desde el cual hará su transferencia</p>
            <select class="form-control my-1">
                <option>BROU</option>
                <option>Santander</option>
                <option>Scotiabank</option>
                <option>BBVA</option>
            </select>
            <label class="mt-1">Codigo</label>
            <input id="account" name="inputTarjeta" class="form-control" type="number" placeholder="Numero de cuenta bancaria">
            `;
            document.getElementById('paymentMetod').innerHTML="Transferencia bancaria";
        }
        
    };

    //validacion para la opcion de credito
    document.getElementById('selectMetod').addEventListener('click', ()=>{
        if(creditPayment == "credito"){
            let num = document.getElementById('card-num').value;
            let date = document.getElementById('card-date').value;
            let key = document.getElementById('card-key').value;

            if (!num || !date || !key){
                alerta.innerHTML =` <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Lo siento!</strong> Debes ingresar los datos de tu tarjeta
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div> `;
                }
            }
        if(creditPayment == "transferencia"){
            let cuenta = document.getElementById('account').value;
            if(!cuenta){
                alerta.innerHTML =` <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Lo siento!</strong> Debes ingresar los datos de tu cuenta
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div> `;
            }
        }    
        
        payMetodSelected = 'true';
    })

    //function que muestra alertas y confirma compra
        function buy(){
            let telefono = document.getElementById('tel').value;
            let calle = document.getElementById('street').value;
            let puerta = document.getElementById('door').value;
            let zona = document.getElementById('zone').value;
            
            console.log(payMetodSelected)
            if(!telefono || !calle || !puerta || !zona){
                alerta.innerHTML =`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Lo siento!</strong> Debes completar el formulario de envío.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> 
                `;
                
            }
            else if(payMetodSelected !== 'true'){
                alerta.innerHTML =` 
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Lo siento!</strong> Debes seleccionar un metodo de pago
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> 
                `;
            }
            else if(itemsTotales == 0){
                alerta.innerHTML =` 
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Lo siento!</strong> Debes agregar productos al carrito
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> 
                `;
            }
            else if(shippingSelected == 0){
                alerta.innerHTML =` 
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Lo siento!</strong> Debes seleccionar un metodo de envío.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> 
                `;
            }
            else{ // LA COMPRA SE REALIZA CON EXITO 
                alerta.innerHTML =`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Felicitaciones ${localStorage.getItem('current-user')}!</strong> Compra realizada con exito!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                `
                let usuario_id = window.localStorage.getItem('current-user')
                for(let items of cartContent.articles){
                    
                    let datos = {
                        "id": usuario_id,
                        "src": items.src,
                        "name": items.name,
                        "unitCost": items.unitCost,
                        "count": items.count
                    }

                    fetch(BUY_REGISTRY, {
                        method: 'POST',
                        headers: {"Content-type": "application/json"}, 
                        body: JSON.stringify(datos)
                    }).then(response=>response.json()
                    ).then(data => console.log(data))

                }

                //eliminamos todos los productos del carrito y todos los calculos
                cartContent.articles.splice(0)
                itemsTotales = 0;
                state = [];
                buyCost = 0;
                mostrarProductos();
                return payMetodSelected = undefined;
            }
        }
