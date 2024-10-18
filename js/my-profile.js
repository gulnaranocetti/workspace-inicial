document.addEventListener("DOMContentLoaded", function () {
  let storedValue = localStorage.getItem("userLoggedIn");
  let logged = storedValue === 'true';
  console.log(logged);
  if (!logged) {
    window.location.href = "login.html";
  }

  const userName = localStorage.getItem("username");

  const userNameElement = document.getElementById("welcome-message");
  const emailField = document.getElementById("email");
  const campoNombre = document.getElementById("nombre");
  const campoSegNomb = document.getElementById("seg-nombre");
  const campoApellido = document.getElementById("apellido");
  const campoSegApell = document.getElementById("seg-apellido");
  const campoContato = document.getElementById("contacto");


  if (userNameElement) {
    userNameElement.innerText = `Bienvenido/a ${userName}!`;
  }
  console.log(userName);

  function cargarValorDesdeLocalStorage(campo, clave) {
    if (campo) {
      campo.value = localStorage.getItem(clave) || '';
    }
  }

  cargarValorDesdeLocalStorage(emailField, "username")
  cargarValorDesdeLocalStorage(campoNombre, "name");
  cargarValorDesdeLocalStorage(campoSegNomb,"sec-name")
  cargarValorDesdeLocalStorage(campoApellido, "surname");
  cargarValorDesdeLocalStorage(campoSegApell, "sec-surname")
  cargarValorDesdeLocalStorage(campoContato, "contact")


  document.getElementById('saveButton').addEventListener('click', function () {

    if (campoNombre === '' || campoApellido === '' || emailField === '') {
      alert('Todos los campos marcados con * son obligatorios.');
      return;
    }

    localStorage.setItem("name", campoNombre.value);
    localStorage.setItem("sec-name", campoSegNomb.value);
    localStorage.setItem("surname", campoApellido.value);
    localStorage.setItem("sec-surname", campoSegApell.value);
    localStorage.setItem("contact", campoContato.value);

    alert('Datos guardados correctamente');


  })



})
