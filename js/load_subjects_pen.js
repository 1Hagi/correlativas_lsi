// Los parámetros de cada materia son incluidos de la siguiente forma y orden:
// ID de la materia (número), 
// Nombre (String),
// Año y Cuatrimestre de la materia (Array de dos números [año, cuatrimestre]),
// Condiciones: Cada materia tiene dos codiciones, una para ser cursada y otra para ser aprobada.
// Condiciones: Cada condicion consta de un array con pares de enteros, donde el primer entero corresponde a un ID de una materia y el segundo entero a un estado requisito de dicha materia.
// Estado actual del alumno en cada materia: 0 = Sin cursar, 1 = Regular, 2 = Aprobada.

function load_subjects () {
        
    window.subject_1 = new Subject(1, "Algoritmos y Estructura de Datos I", [1, 1], 0, 0, 0);
    window.subject_2 = new Subject(2, "Álgebra", [1, 1], 0, 0, 0);

    window.subject_3 = new Subject(3, "Algoritmos y Estructura de Datos II", [1, 2], [[1, 1]], [1], 0);
    window.subject_4 = new Subject(4, "Lógica y Matemática Computacional", [1, 2], [[2, 1]], [2], 0);
    window.subject_5 = new Subject(5, "Sistemas y Organizaciones", [1, 2], 0, 0, 0);

    window.subject_6 = new Subject(6, "Paradigmas y Lenguajes", [2, 1], [[3, 1],[1, 2]], [3], 0);
    window.subject_7 = new Subject(7, "Arquitectura y Organización de Computadoras", [2, 1], [[4, 1], [1, 2]], [4], 0);
    window.subject_8 = new Subject(8, "Cálculo Diferencial e Integral", [2, 1], [[4, 1],[2, 2]], [2, 4], 0);

    window.subject_9 = new Subject(9, "Programación Orientada a Objetos", [2, 2], [[6, 1], [3, 2]], [3, 6], 0);
    window.subject_10 = new Subject(10, "Sistemas Operativos", [2, 2], [[7, 1]], [7], 0);
    window.subject_11 = new Subject(11, "Bases de Datos I", [2, 2], [[7, 1]], [7], 0);

    window.subject_12 = new Subject(12, "Programación Web", [3, 1], [[9, 1],[6, 2]], [9, 11], 0);
    window.subject_13 = new Subject(13, "Comunicación de Datos", [3, 1], [[10, 1],[7, 2]], [10], 0);
    window.subject_14 = new Subject(14, "Ingeniería de Software I", [3, 1], [[9, 1],[11, 1],[6, 2]], [9, 11], 0);

    window.subject_15 = new Subject(15, "Probabilidad y Estadística", [3, 2], [[8, 1],[4, 2]], [8], 0);
    window.subject_16 = new Subject(16, "Programación Avanzada", [3, 2], [[12, 1]], [12], 0);
    window.subject_17 = new Subject(17, "Ingeniería de Software II", [3, 2], [[14, 1],[11, 2]], [14], 0);
    window.subject_0 = new Extracurricular(0, "Inglés Técnico Informático (extracurricular)", [3, 2], 0, 0, 0);

    window.subject_18 = new Subject(18, "Inteligencia Artificial", [4, 1], [[15, 1],[8, 2]], [15], 0);
    window.subject_19 = new Subject(19, "Teoría de Computación", [4, 1], [[15, 1],[8,2]], [15], 0);
    window.subject_20 = new Subject(20, "Redes de Datos", [4, 1], [[13, 1],[10, 2]], [13], 0);

    window.subject_21 = new Subject(21, "Ingeniería de Software III", [4, 2], [[17, 1], [14, 2]], [17], 0);
    window.subject_22 = new Subject(22, "Bases de Datos II", [4, 2], [[15, 1],[11, 2]], [15], 0);
    window.subject_23 = new Subject(23, "Métodos Computacionales", [4, 2], [[15,1], [8, 2]], [15], 0);
    window.subject_24 = new Subject(24, "Análisis de Organizaciones y Procesos", [4, 2], [[17, 1], [5, 2]], [17], 0);

    window.subject_25 = new Subject(25, "Auditoria y Seguridad Informática", [5, 1], [[18, 1], [15, 2]], [18], 0);
    window.subject_26 = new Subject(26, "Emprendedorismo y Modelos de Negocios", [5, 1], [[17, 1], [14, 2]], [17], 0);
    window.subject_27 = new Subject(27, "Optativa I", [5, 1], [[12, 2], [13, 2], [14, 2], [15, 2], [16, 2], [17, 2]], [12, 13, 14, 15, 16, 17], 0);

    window.subject_28 = new Subject(28, "Introducción a la Ciencia de Datos", [5, 2], [[21, 1], [20, 2]], [21], 0);
    window.subject_29 = new Subject(29, "Aspectos Profesionales y Sociales de la Informática", [5, 2], [[26, 1], [17, 2]], [26], 0);
    window.subject_30 = new Subject(30, "Optativa II", [5, 2], [[12, 2], [13, 2], [14, 2], [15, 2], [16, 2], [17, 2]], [12, 13, 14, 15, 16, 17], 0);
    window.subject_31 = new Subject(31, "Proyecto Final", [5, 1], [[20, 1], [21, 1], [22, 1], [16, 2], [17, 2]], [18, 19, 20, 21, 22, 23, 24], 0, 1);

    window.subjects = [
        subject_1,
        subject_2,

        subject_3,
        subject_4,
        subject_5,

        subject_6,
        subject_7,
        subject_8,

        subject_9,
        subject_10,
        subject_11,

        subject_12,
        subject_13,
        subject_14,

        subject_15,
        subject_16,
        subject_17,
        subject_0,

        subject_18,
        subject_19,
        subject_20,

        subject_21,
        subject_22,
        subject_23,
        subject_24,

        subject_31,
        subject_25,
        subject_26,
        subject_27,

        subject_28,
        subject_29,
        subject_30,

    ];
    
    for(let i = 0; i < subjects.length; i++) {
        subjects[i].create();
        
    }

}
