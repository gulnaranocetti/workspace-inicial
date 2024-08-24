function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

document.getElementById("button").addEventListener("click", function() {

    const usuario = document.getElementById("login").value.trim();
    const password = document.getElementById("password").value.trim();

    if (usuario === "" || password === "") {
        event.preventDefault();
        showAlertError();
        return;
    }
}
)