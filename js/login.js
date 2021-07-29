
const USERS_DATABASE = "http://localhost:4000/users-data";
let usersArray = []; //donde se almacenan los usuarios de la base de datos

 let alert = document.createElement('div');


 // Initialize Firebase
 
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
//Inicializa firebase
 firebase.initializeApp(firebaseConfig);


    /* Confirguracion para que cuando se cierre pestaña o navegador, se cierre la session automaticamente */
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  });
  

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
  
  //Funcion para iniciar sesion con cuenta propia(creada anteriormente en firebase)
  
  function verificarDatos(){
    let emailU = document.getElementById('input-name').value;
    let passU = document.getElementById('input-password').value;
    let usuarioRegistrado = false;
    window.localStorage.setItem('current-user', emailU);
    for(let user of usersArray){
      if(emailU == user.email && passU == user.pass){
        console.log(user);
        usuarioRegistrado = true;
      }
    }
    if(usuarioRegistrado == true){
      document.getElementById('myForm').action='home.html'
    }else{
      document.body.appendChild(alert);
      alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Los datos ingresados son incorrectos!</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
      </div>`
      document.getElementById('input-name').value = '';
      document.getElementById('input-password').value = ''
      return false;
    }
      
  };

      
   
      
      // >>>>>>>>> ANIMACION PARA LABEL DE EMAIL <<<<<<<
      document.getElementById('email-id').addEventListener('focusin', function(){
        document.getElementById('label-email').style.transform = "translate(0,-25px)"
        document.getElementById('label-email').style.color = "#0e0c0c"
      
    });
    document.getElementById('email-id').addEventListener('focusout', function(){
      let label = document.getElementById('label-email');
      let input = document.getElementById('email-id');
      if(input.value == ''){
        label.style.transform = "translate(50px,10px)";
        label.style.color = 'gray';
      }
    });
    //>>>>>>> ANIMACION PARA LABEL DE CONTRASEÑA 1 <<<<<<<<<<
    document.getElementById('pass-id').addEventListener('focusin', function(){
      document.getElementById('label-2').style.transform = "translate(0,-25px)"
      document.getElementById('label-2').style.color = "#0e0c0c"
      
    });
    document.getElementById('pass-id').addEventListener('focusout', function(){
      let label = document.getElementById('label-2');
      let input = document.getElementById('pass-id');
      if(input.value == ''){
        label.style.transform = "translate(50px,10px)";
        label.style.color = 'gray';
      }
    });
    //>>>>>>> ANIMACION PARA LABEL DE CONTRASEÑA 2 <<<<<<<<<<
    document.getElementById('pass-id-2').addEventListener('focusin', function(){
      document.getElementById('label-3').style.transform = "translate(0,-25px)"
      document.getElementById('label-3').style.color = "#0e0c0c"
      
    });
    document.getElementById('pass-id-2').addEventListener('focusout', function(){
      let label = document.getElementById('label-3');
      let input = document.getElementById('pass-id-2');
      if(input.value == ''){
        label.style.transform = "translate(50px,10px)";
        label.style.color = 'gray';
      }
    });
    
    function signIn(){
      document.getElementById('modal-register').appendChild(alert);
      let iEmail = document.getElementById('email-id').value;
      let iPass = document.getElementById('pass-id').value;
      let iPass2 = document.getElementById('pass-id-2').value;
      
      if(iEmail.length == 0 || iPass.length == 0 || iPass2.length == 0){
        alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Debes completar todos los campos!</strong>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
          </div>`;
      
      }else if(iPass != iPass2){
        alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Las contraseñas no coinciden!</strong>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
          </div>`;
        document.getElementById('pass-id').value = '';
        document.getElementById('pass-id-2').value = '';

      }else if(!iEmail.includes('@') || !iEmail.includes('.com')){
        alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Esa no es una dirección de correo correcta!</strong>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
          </div>`;
        document.getElementById('email-id').value = '';
      }else{
        let datos = {
          "email" : iEmail,
          "pass" : iPass
        };

        fetch(USERS_DATABASE,{
          method: 'POST',
          headers: {'Content-type':'application/json'},
          body: JSON.stringify(datos)
        }).then(response => console.log(response) )
        .catch(error => console.log(error))
      }

      
    };

    document.addEventListener('DOMContentLoaded', async function(){
      await fetch(USERS_DATABASE).then(response=>{
        if(response.ok){
          return response.json();
        }
      }).then((response=>{
        usersArray = response
        console.log(usersArray);
      })).catch((error)=>console.log(error))

    })