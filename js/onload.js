// Cargar las materias y cargar los estados guardados en local storage


load_subjects();
cargarEstadoMaterias(subjects);
// el agregado del skipEffect permitio solucionar el problema al marcar varias materias como regular
subjects.forEach(subject => {
    subject.update(undefined, { skipEffects: true }); // sin parámetro => valida reglas
});
/*Soluciona un error que cuando actualizas no se veia las materias desbloqueadas cuando aprobas o regularizas otra*/
subjects.forEach(subject => {
    subject.sincronizarVista();
});

// Barras de Progreso

const analistaProgressBar = document.getElementById('analista_degree');
const licenciadoProgressBar = document.getElementById('licenciado_degree');
const analistaPorcentaje = document.getElementById('analista_degree_text');
const licenciadoPorcentaje = document.getElementById('licenciado_degree_text');
let analista_progress = 0;
let licenciado_progress = 0;
actualiarProgreso();

document.addEventListener('click', (event) => {
actualiarProgreso();
});
/* el evento del click para las barras de progreso se convirtio en una funcion para reutilizar para que funcione
correctamente al mismo tiempo que se actualiza un status de una materia*/
function actualiarProgreso(){
    analista_progress = 0;
    licenciado_progress = 0;

    if (window.location.href.includes("plan_estudio_nuevo.html")) {
        subjects.forEach(subject => {
            if(subject._id < 18) {
                analista_progress += subject._status;
            }
            licenciado_progress += subject._status;
        });
    }   

    if (window.location.href.includes("plan_estudio_anterior.html")) {
        subjects.forEach(subject => {
            if(subject._id < 401) {
                analista_progress += subject._status;
            }
            licenciado_progress += subject._status;
        });
    }

    analistaProgressBar.value = analista_progress;
    licenciadoProgressBar.value = licenciado_progress;

    analistaPorcentaje.innerHTML = (analista_progress * 100 / 36).toFixed(1) + " %";
    licenciadoPorcentaje.innerHTML = (licenciado_progress * 100 / 58).toFixed(1) + " %";


}

// Interacción con el scroll vertical y horizontal al usar el ratón.

const contenedor = document.getElementsByTagName("main")[0];


contenedor.addEventListener("wheel", (event) => {

    // Detectar si el desplazamiento es suave (touchpad)
    const isTouchpad = Math.abs(event.deltaY) < 100; // Los touchpads suelen tener valores pequeños

    // Si es touchpad, dejamos el comportamiento predeterminado
    if (isTouchpad) return;

    // Evitamos el comportamiento predeterminado
    event.preventDefault();

    // Detectamos si hay scroll vertical disponible
    const isScrollableVertical = 
    contenedor.scrollHeight > contenedor.clientHeight;

    // Variables para determinar desplazamiento
    const deltaX = event.deltaX || 0; // Movimiento horizontal del evento
    const deltaY = event.deltaY || 0; // Movimiento vertical del evento

    // Si hay scroll vertical, priorizamos el movimiento vertical
    if (isScrollableVertical && Math.abs(deltaY) > Math.abs(deltaX)) {
        contenedor.scrollTop += deltaY;
    } else {
    // Si no hay scroll vertical, aplicamos el desplazamiento horizontal
    contenedor.scrollLeft += deltaY; // Usamos deltaY para desplazarnos horizontalmente
    }
});

// Interacción al desplazarse por la pantalla por medio del arrastre del click

// Variables globales
let isMouseDown = false; // Si el botón del mouse está pulsado
let startX, startY, scrollLeft, scrollTop;
let hasDragged = false; // Indica si hubo un arrastre
let globalDragging = false; // Bandera global para arrastre

// Detectar cuando se hace clic en el contenedor principal
contenedor.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    hasDragged = false;
    globalDragging = false; // Reiniciamos la bandera global
    contenedor.style.cursor = "grabbing";
    startX = e.pageX - contenedor.offsetLeft;
    startY = e.pageY - contenedor.offsetTop;
    scrollLeft = contenedor.scrollLeft;
    scrollTop = contenedor.scrollTop;
});

// Detectar movimiento del mouse
contenedor.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    e.preventDefault();

    // Calculamos el desplazamiento
    const x = e.pageX - contenedor.offsetLeft;
    const y = e.pageY - contenedor.offsetTop;
    const walkX = (x - startX) * 1;
    const walkY = (y - startY) * 1;

    // Marcamos que hubo arrastre si hay un movimiento considerable
    if (Math.abs(walkX) > 5 || Math.abs(walkY) > 5) {
        hasDragged = true;
        globalDragging = true; // Activamos la bandera global
    }

    // Actualizamos el scroll
    contenedor.scrollLeft = scrollLeft - walkX;
    contenedor.scrollTop = scrollTop - walkY;
});

// Detectar cuando se suelta el mouse
document.addEventListener("mouseup", (e) => {
    if (isMouseDown) {
        isMouseDown = false;
        contenedor.style.cursor = "grab";
    }
});

// Evitar que el evento click se active si hubo arrastre
document.addEventListener("click", (e) => {
    if (globalDragging) {
        e.stopPropagation(); // Detener propagación del evento click
        e.preventDefault(); // Prevenir el comportamiento predeterminado
        globalDragging = false; // Reiniciamos la bandera global
    }
});
