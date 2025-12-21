
/*guarda los estados en que se marca las materias en el local storage*/
function guardarEstadoMaterias(subjects){

    const data = subjects.map( s => ({
        id: s._id,
        status: s._status
    }));
    localStorage.setItem("estadoMaterias",JSON.stringify(data));
}
/*Carga los estados guardados en el local storage desde el onload.js para que sea visible para el usuario cada vez que actualiza la web*/
function cargarEstadoMaterias(subjects) {
    const data = JSON.parse(localStorage.getItem("estadoMaterias"));
    if (!data) return;

    data.forEach(saved => {
        if (saved.id === undefined) return;
        const subject = subjects.find(s => s._id === saved.id);
        if (subject) {
            subject._status = saved.status;
            subject.update(saved.status);
        }
    });

}

