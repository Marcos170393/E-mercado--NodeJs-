const CATEGORIES_URL = "http://localhost:4000/categories"; //listo
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "http://localhost:4000/categories-info";//listo
const PRODUCTS_URL = "http://localhost:4000/products";//listo
const PRODUCT_INFO_URL = "http://localhost:4000/product-info";//listo
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:4000/comments";//listo
const CART_INFO_URL_PROPIO = "http://localhost:4000/cart-products";// listo
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const BUY_REGISTRY = "http://localhost:4000/buy-registry";
const SELL = "http://localhost:4000/new-products";


var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyDeTPHml3SnCf7Im3ENuudvHRtS8LRw73w",
  authDomain: "signin-649d4.firebaseapp.com",
  databaseURL: "https://signin-649d4.firebaseio.com",
  projectId: "signin-649d4",
  storageBucket: "signin-649d4.appspot.com",
  messagingSenderId: "949779862152",
  appId: "1:949779862152:web:ef6cb06e3f99e323f7853d"
};
//Inicializacion de firebase
firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', function(e){

  /* Brinda la informacion del usuario logueado actualmente */
firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
            window.localStorage.setItem('current-user', displayName);
            document.getElementById('dropdownMenu2').innerHTML=`<img src="${photoURL}" style="width:30px; border-radius:100%;"> ${localStorage.getItem('current-user')}` ;
        }//Si el usuario no esta logueado ni local ni por google, se lo redirige al login
        if((!user && localStorage.length < 1) && window.location != 'index.html'){
          window.location.replace('index.html')
          alert('Debes estar registrado para poder ingresar al sitio. Gracias')
        }
    });

    

scrollNav();


// se muestra la informacion del usuario en el nav-header
  let imagenPerfil = localStorage.getItem('img-current-user');
  let usuarioActual = window.localStorage.getItem('current-user');
  let userImageState = window.localStorage.getItem('userImageLoaded');
  console.log(userImageState);
    let json = localStorage.getItem(usuarioActual);
    let stringStorage = JSON.parse(json);


document.getElementById('dropdownMenu2').innerHTML= usuarioActual ;


if(userImageState == "true"){
  document.getElementById('dropdownMenu2').innerHTML=`<img src="${stringStorage.photoUser}" style="width:30px; border-radius:100%;"> ${localStorage.getItem('current-user')}` ;
}
else{
  document.getElementById('dropdownMenu2').innerHTML= `<img src="img/user_icon.png" style="width:30px; border-radius:100%;"> ${localStorage.getItem('current-user')}`;``
}
})



/*funcion para cerrar session*/
function cerrar(){
    firebase.auth().signOut()
    .then(function(){ 
      window.localStorage.removeItem('img-current-user');
      window.localStorage.removeItem('trigger')
      window.open("index.html","_self");
})
  .catch(function(error){
    console.log(error)
})
};

/* Inicio de session con cuenta de google */
function accountLogin(){

  var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(){
      window.open("home.html","_self");
      
    })
    .catch(function(){
      alert('Al parecer este domínio no tiene autorización para acceder a Google. Contacte con el responsable del sitio web');
      
    })
};

//funcion para cambiar el color del nav y cambiar a menu desplegable, cuando se hace scroll
function scrollNav(){
  if(document.documentElement.scrollTop > 200 || document.documentElement.scrollTop > 200){
    document.getElementById('nav-1').className = "navbar sticky-top py-1 fondo-nav "
  }else{
    document.getElementById('nav-1').className = " navbar navbar-expand-lg bg-light shadow-lg"
  }
}

//.........................................
//BOTONES FLOTANTES EN BODY
//...............
const FLOAT_BUTTONS = document.createElement('div');
document.body.appendChild(FLOAT_BUTTONS);

FLOAT_BUTTONS.innerHTML = `
    <div class="flex flex-column justify-content-around float-buttons" style="width: 3rem;">
      <a href="https://www.facebook.com/?hl=es-la" target="_blank">
        <div type='button' class="text-center rounded-top btn-media bg-secondary" style="font-size: 1.5em;">
          <i class="fab fa-facebook-f"></i>
       </div>
      </a>
     
      <a target="_blank" href="https://www.instagram.com/?hl=es-la" >
        <div type='button' class=" text-center btn-media"  style="font-size: 1.5em; background-color: blue">
          <i class="fab fa-instagram"></i>
        </div>
      </a>

      <a href="https://twitter.com/?lang=es" target="_blank">
        <div type='button' class=" text-center bg-primary rounded-bottom btn-media" style="font-size: 1.5em;">
          <i class="fab fa-twitter"></i>
        </div>
      </a>  
    </div>
`;
