//Separo los localStorage de los dos archivos.html correspondiente a los planes
function obtenerClavePlan(){
    if(window.location.href.includes("plan_estudio_nuevo.html")){
        return "estadoMaterias_nuevo";
    }
    if(window.location.href.includes("plan_estudio_anterior.html")){
        return "estadoMaterias_anterior";
    }
    //se agrega un return a estadosMaterias por seguridad de que lo demas se realiza correctamente
    return "estadoMaterias";
}

/*guarda los estados en que se marca las materias en el local storage*/
function guardarEstadoMaterias(subjects){

    const data = subjects.map( s => ({
        id: s._id,
        status: s._status
    }));
    const clave = obtenerClavePlan();       
    localStorage.setItem(clave,JSON.stringify(data));
}
/*Carga los estados guardados en el local storage desde el onload.js para que sea visible para el usuario cada vez que actualiza la web*/
function cargarEstadoMaterias(subjects) {
    const clave = obtenerClavePlan();
    const data = JSON.parse(localStorage.getItem(clave));

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

