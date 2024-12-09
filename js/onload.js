
// Los parámetros de cada materia son incluidos de la siguiente forma y orden:
// ID de la materia (número), 
// Nombre (String),
// Año y Cuatrimestre de la materia (Array de dos números [año, cuatrimestre]),
// Condiciones: Cada materia tiene dos codiciones, una para ser cursada y otra para ser aprobada.
// Condiciones: Cada condicion consta de un array con pares de enteros, donde el primer entero corresponde a un ID de una materia y el segundo entero a un estado requisito de dicha materia.
// Estado actual del alumno en cada materia: 0 = Sin cursar, 1 = Regular, 2 = Aprobada.

const subject_101 = new Subject(101, "Algoritmos y Estructura de Datos I", [1, 1], 0, 0, 0);
const subject_102 = new Subject(102, "Álgebra", [1, 1], 0, 0, 0);

const subject_103 = new Subject(103, "Algoritmos y Estructura de Datos II", [1, 2], [[101, 1]], [101], 0);
const subject_104 = new Subject(104, "Lógica y Matemática Computacional", [1, 2], 0, [102], 0);
const subject_105 = new Subject(105, "Sistemas y Organizaciones", [1, 2], 0, 0, 0);

const subject_201 = new Subject(201, "Paradigmas y Lenguajes", [2, 1], [[103, 1],[101, 2]], [103], 0);
const subject_202 = new Subject(202, "Arquitectura y Organización de Computadoras", [2, 1], [[104, 1], [101, 2]], [104], 0);
const subject_203 = new Subject(203, "Cálculo Diferencial e Integral", [2, 1], [[104, 1],[102, 2]], [102, 104], 0);

const subject_204 = new Subject(204, "Programación Orientada a Objetos", [2, 2], [[201, 1], [103, 2]], [103, 201], 0);
const subject_205 = new Subject(205, "Sistemas Operativos", [2, 2], [[202, 1],[103, 2]], [103, 202], 0);
const subject_206 = new Subject(206, "Administración y Gestión de Organizaciones", [2, 2], [[105, 1]], [105], 0);

const subject_301 = new Subject(301, "Taller de Programación I", [3, 1], [[204, 1],[201, 2]], [204], 0);
const subject_302 = new Subject(302, "Comunicaciones de Datos", [3, 1], [[205, 1],[202, 2]], [205], 0);
const subject_303 = new Subject(303, "Ingeniería de Software I", [3, 1], [[204, 1],[206, 1],[105, 2]], [204, 206], 0);

const subject_304 = new Subject(304, "Taller de Programación II", [3, 2], [[301, 1],[303, 1],[204, 2],[205, 2]], [301, 303], 0);
const subject_305 = new Subject(305, "Probabilidad y Estadística", [3, 2], [[203, 1]], [203], 0);
const subject_306 = new Subject(306, "Bases de Datos I", [3, 2], [[204, 1],[202, 2]], [303], 0);
const subject_307 = new Extracurricular(307, "Inglés Técnico Informático (extracurricular)", [3, 2], 0, 0, 0);

const subject_401 = new Subject(401, "Ingeniería de Software II", [4, 1], [[303, 1],[206, 2]], [303], 0);
const subject_402 = new Subject(402, "Economía Aplicada", [4, 1], [[303, 1],[206,2]], [303], 0);
const subject_403 = new Subject(403, "Teoría de la Computación", [4, 1], [[305, 1],[202, 2]], [202, 305], 0);

const subject_404 = new Subject(404, "Redes de Datos", [4, 2], [[302, 2]], [302], 0);
const subject_405 = new Subject(405, "Bases de Datos II", [4, 2], [[306, 1],[303, 2]], [306], 0);
const subject_406 = new Subject(406, "Métodos Computacionales", [4, 2], [[305,1], [203, 2]], [305], 0);

const subject_501 = new Subject(501, "Proyecto Final de Carrera", [5, 1], [[404, 1], [405, 1], [401, 2]], [101, 102, 103, 104, 105, 201, 202, 203, 204, 205, 206, 301, 302, 303, 304, 305, 306, 307, 401, 402, 403, 404, 405, 406, 502, 503, 504, 505], 0, 1);
const subject_502 = new Subject(502, "Auditoria y Seguridad Informática", [5, 1], [[404, 1], [405, 1], [401, 2]], [404, 405], 0);
const subject_503 = new Subject(503, "Optativa I", [5, 1], [[403, 1], [305, 2]], [403], 0);

const subject_504 = new Subject(504, "Optativa II", [5, 2], [[404, 1], [302, 2]], [404], 0);
const subject_505 = new Subject(505, "Optativa III", [5, 2], [[405, 1], [401, 2]], [405], 0);

let subjects = [
    subject_101,
    subject_102,

    subject_103,
    subject_104,
    subject_105,

    subject_201,
    subject_202,
    subject_203,
    subject_204,
    subject_205,
    subject_206,

    subject_301,
    subject_302,
    subject_303,

    subject_304,
    subject_305,
    subject_306,
    subject_307,

    subject_401,
    subject_402,
    subject_403,
    subject_404,
    subject_405,
    subject_406,

    subject_501,
    subject_502,
    subject_503,

    subject_504,
    subject_505
];

for(let i = 0; i < subjects.length; i++) {
    subjects[i].create();
};

// Barras de Progreso

const analistaProgressBar = document.getElementById('analista_degree');
const licenciadoProgressBar = document.getElementById('licenciado_degree');
const analistaPorcentaje = document.getElementById('analista_degree_text');
const licenciadoPorcentaje = document.getElementById('licenciado_degree_text');
let analista_progress = 0;
let licenciado_progress = 0;

document.addEventListener('click', (event) => {

    analista_progress = 0;
    licenciado_progress = 0;

    subjects.forEach(subject => {
        if(subject._id < 401) {
            analista_progress += subject._status;
        }
        licenciado_progress += subject._status;
    });

    analistaProgressBar.value = analista_progress;
    licenciadoProgressBar.value = licenciado_progress;
    analistaPorcentaje.innerHTML = (analista_progress * 100 / 36).toFixed(1) + " %";
    licenciadoPorcentaje.innerHTML = (licenciado_progress * 100 / 58).toFixed(1) + " %";
})

// Interacción con el scroll vertical y horizontal al usar el ratón.

const contenedor = document.getElementsByTagName("main")[0];

contenedor.addEventListener("wheel", (event) => {
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