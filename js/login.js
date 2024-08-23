document.getElementById("btn").addEventListener("click", function() {

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    if (usuario === "" || password === ""){
        console.log("Alguno de los campos solicitados no fue completado.");
    }
}
);