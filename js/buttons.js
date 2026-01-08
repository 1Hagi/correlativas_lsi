function volver() {
    window.location.href = "./index.html";
}

function showInfo() {
    const infoContent = document.getElementById("info-content");
    infoContent.classList.toggle('active');
}

function reset(){
localStorage.removeItem("estadoMaterias");
location.reload();
}