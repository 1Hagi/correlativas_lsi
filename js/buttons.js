function volver() {
    window.location.href = "./index.html";
}

function showInfo() {
    const infoContent = document.getElementById("info-content");
    infoContent.classList.toggle('active');
}
//Se agrego la const clave en la funcion del boton reset para que el reset funcione independiente en cada plan de estudio
function reset(){
    const clave = obtenerClavePlan();
    localStorage.removeItem(clave);
    location.reload();
}