document.addEventListener("DOMContentLoaded", function () {
  let storedValue = localStorage.getItem("userLoggedIn");
  let logged = storedValue === 'true';
  console.log(logged);
  if (!logged) {
    window.location.href = "login.html";
  }

  const userName = localStorage.getItem("username"); // Nombre del usuario que inició sesión
  const user = document.getElementById("user");

  const userNameElement = document.getElementById("welcome-message");
  const emailField = document.getElementById("email");
  const campoNombre = document.getElementById("nombre");
  const campoSegNomb = document.getElementById("seg-nombre");
  const campoApellido = document.getElementById("apellido");
  const campoSegApell = document.getElementById("seg-apellido");
  const campoContato = document.getElementById("contacto");
  const imgProfile = document.getElementById("img-profile").querySelector("img"); // Imagen de perfil
  const fileInput = document.getElementById("profile-image-input"); // Input para subir la imagen

  if (userNameElement) {
    userNameElement.innerText = `Bienvenido/a ${userName}!`;
  }
  console.log(userName);

  // Cargar los datos del usuario desde localStorage
  function cargarDatosUsuario() {
    const userData = JSON.parse(localStorage.getItem(userName)); // Obtener los datos del usuario
    if (userData) {
      campoNombre.value = userData.name || '';
      campoSegNomb.value = userData.secName || '';
      campoApellido.value = userData.surname || '';
      campoSegApell.value = userData.secSurname || '';
      campoContato.value = userData.contact || '';
      emailField.value = userData.email || ''; // El email es el nombre de usuario
      user.value = userName;
      // Mostrar la imagen de perfil si está almacenada
      if (userData.profileImage) {
        imgProfile.src = userData.profileImage;
      }
    } else {
      // Si no hay datos guardados, dejar los campos vacíos
      campoNombre.value = '';
      campoSegNomb.value = '';
      campoApellido.value = '';
      campoSegApell.value = '';
      campoContato.value = '';
      emailField.value = ''; // Mostrar el email
      user.value= userName || '';
    }
  }

  cargarDatosUsuario(); // Cargar los datos al cargar la página

  // Validación del formulario con Bootstrap
(() => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
      
    })
  
  })()

  // Guardar los datos del usuario en localStorage
  document.getElementById('saveButton').addEventListener('click', function () {
    const form = document.querySelector('.needs-validation'); // Seleccionamos el formulario
    
    // Validar el formulario antes de guardar
    if (form.checkValidity()) {
      const userData = {
        name: campoNombre.value,
        secName: campoSegNomb.value,
        surname: campoApellido.value,
        secSurname: campoSegApell.value,
        contact: campoContato.value,
        email: emailField.value // Guardar también el email
      };

        // Verificar si se ha seleccionado una imagen de perfil
        if (fileInput.files.length > 0) {
          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.onload = function (e) {
            const base64Image = e.target.result;
            userData.profileImage = base64Image; // Guardar la imagen en base64
            imgProfile.src = base64Image; // Mostrar la imagen de perfil en tiempo real
            localStorage.setItem(userName, JSON.stringify(userData)); // Guardar todos los datos en localStorage
          };
          reader.readAsDataURL(file); // Convertir la imagen a base64
        } else {
          // Si no se ha cambiado la imagen, solo guardar el resto de los datos
          localStorage.setItem(userName, JSON.stringify(userData));
        }
      } else {
        event.preventDefault(); // Prevenir el guardado si no es válido
        form.classList.add('was-validated'); // Activar los estilos de validación
      }
    });
  });
