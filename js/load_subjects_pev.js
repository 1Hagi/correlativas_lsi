// Los parámetros de cada materia son incluidos de la siguiente forma y orden:
// ID de la materia (número), 
// Nombre (String),
// Año y Cuatrimestre de la materia (Array de dos números [año, cuatrimestre]),
// Condiciones: Cada materia tiene dos codiciones, una para ser cursada y otra para ser aprobada.
// Condiciones: Cada condicion consta de un array con pares de enteros, donde el primer entero corresponde a un ID de una materia y el segundo entero a un estado requisito de dicha materia.
// Estado actual del alumno en cada materia: 0 = Sin cursar, 1 = Regular, 2 = Aprobada.

function load_subjects () {
        
    window.subject_101 = new Subject(101, "Algoritmos y Estructura de Datos I", [1, 1], 0, 0, 0);
    window.subject_102 = new Subject(102, "Álgebra", [1, 1], 0, 0, 0);

    window.subject_103 = new Subject(103, "Algoritmos y Estructura de Datos II", [1, 2], [[101, 1]], [101], 0);
    window.subject_104 = new Subject(104, "Lógica y Matemática Computacional", [1, 2], 0, [102], 0);
    window.subject_105 = new Subject(105, "Sistemas y Organizaciones", [1, 2], 0, 0, 0);

    window.subject_201 = new Subject(201, "Paradigmas y Lenguajes", [2, 1], [[103, 1],[101, 2]], [103], 0);
    window.subject_202 = new Subject(202, "Arquitectura y Organización de Computadoras", [2, 1], [[104, 1], [101, 2]], [104], 0);
    window.subject_203 = new Subject(203, "Cálculo Diferencial e Integral", [2, 1], [[104, 1],[102, 2]], [102, 104], 0);

    window.subject_204 = new Subject(204, "Programación Orientada a Objetos", [2, 2], [[201, 1], [103, 2]], [103, 201], 0);
    window.subject_205 = new Subject(205, "Sistemas Operativos", [2, 2], [[202, 1],[103, 2]], [103, 202], 0);
    window.subject_206 = new Subject(206, "Administración y Gestión de Organizaciones", [2, 2], [[105, 1]], [105], 0);

    window.subject_301 = new Subject(301, "Taller de Programación I", [3, 1], [[204, 1],[201, 2]], [204], 0);
    window.subject_302 = new Subject(302, "Comunicaciones de Datos", [3, 1], [[205, 1],[202, 2]], [205], 0);
    window.subject_303 = new Subject(303, "Ingeniería de Software I", [3, 1], [[204, 1],[206, 1],[105, 2]], [204, 206], 0);

    window.subject_304 = new Subject(304, "Taller de Programación II", [3, 2], [[301, 1],[303, 1],[204, 2],[205, 2]], [301, 303], 0);
    window.subject_305 = new Subject(305, "Probabilidad y Estadística", [3, 2], [[203, 1]], [203], 0);
    window.subject_306 = new Subject(306, "Bases de Datos I", [3, 2], [[204, 1],[202, 2]], [303], 0);
    window.subject_307 = new Extracurricular(307, "Inglés Técnico Informático (extracurricular)", [3, 2], 0, 0, 0);

    window.subject_401 = new Subject(401, "Ingeniería de Software II", [4, 1], [[303, 1],[206, 2]], [303], 0);
    window.subject_402 = new Subject(402, "Economía Aplicada", [4, 1], [[303, 1],[206,2]], [303], 0);
    window.subject_403 = new Subject(403, "Teoría de la Computación", [4, 1], [[305, 1],[202, 2]], [202, 305], 0);

    window.subject_404 = new Subject(404, "Redes de Datos", [4, 2], [[302, 2]], [302], 0);
    window.subject_405 = new Subject(405, "Bases de Datos II", [4, 2], [[306, 1],[303, 2]], [306], 0);
    window.subject_406 = new Subject(406, "Métodos Computacionales", [4, 2], [[305,1], [203, 2]], [305], 0);

    window.subject_501 = new Subject(501, "Proyecto Final de Carrera", [5, 1], [[404, 1], [405, 1], [401, 2]], [101, 102, 103, 104, 105, 201, 202, 203, 204, 205, 206, 301, 302, 303, 304, 305, 306, 307, 401, 402, 403, 404, 405, 406, 502, 503, 504, 505], 0, 1);
    window.subject_502 = new Subject(502, "Auditoria y Seguridad Informática", [5, 1], [[404, 1], [405, 1], [401, 2]], [404, 405], 0);
    window.subject_503 = new Subject(503, "Optativa I", [5, 1], [[403, 1], [305, 2]], [403], 0);

    window.subject_504 = new Subject(504, "Optativa II", [5, 2], [[404, 1], [302, 2]], [404], 0);
    window.subject_505 = new Subject(505, "Optativa III", [5, 2], [[405, 1], [401, 2]], [405], 0);

    window.subjects = [
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
}
