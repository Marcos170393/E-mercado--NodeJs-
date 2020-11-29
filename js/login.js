
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
   
  document.getElementById('acceso').addEventListener('click', function(){
        let emailU = document.getElementById('input-name').value;
        let passU = document.getElementById('input-password').value;
        window.localStorage.setItem('current-user', emailU)
            if(emailU){
              console.log(emailU);
             document.getElementById('myForm').action='home.html'
            }
            else if(passU.length < 8){
              alert('La contraseña debe ser mayor a 8 caracteres')
            }
        
    })
    
  document.addEventListener('DOMContentLoaded',function(e){
  
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
            document.getElementById('user.name').innerHTML= `<img src="${photoURL}" style="width: 50px"> ${displayName} <button class="btn btn-info float-right" onclick="logOut()">Cerrar sesión</button>`;
            window.localStorage.setItem('current-user', displayName)
        }
      
      });
    
 })

 
function logOut(){
  firebase.auth().signOut()
  window.location.reload();
}