class Extracurricular extends Subject {
    constructor(id, nombre, ubication, conditions_01, conditions_02, status) {
    super(id, nombre, ubication, conditions_01, conditions_02, status);
    }

    create() {

        // La siguiente línea de código obtiene la posición de la columna donde debe estár ubicado el objeto
        let ubication = document.getElementById("subject_column_" + this._ubication[0] + "_" + this._ubication[1]);

        // Crear los elementos HTML de cada materia
        let yourself = `
                            <div class="subject_container ` + ((this._conditions_01 == 0) ? 'mark_01' : 'status_00' ) + `" id="subject_` + this._id + `" onclick="subject_` + this._id + `.viewDetails()">
                                <div class="btn-style510"></div>
                                <div class="subject_id">` + this._id + `</div>
                                <p class="subject_name">` + this._nombre + `</p>
                                <div class="subject_status">
                                    <img class="subject_status_img ` + ((this.puede_cursar())? ' ': 'disabled') + `" src="./img/padlock_open.png" alt="padlock" />
                                </div>

                                <div class="subject_new hidden">Nuevo Desbloqueado</div>
                                <div class="subject_requeriment hidden">Requisito Necesario</div>

                                <div class="dropdown hidden" id="subject_dropdown_` + this._id + `_0">
                                    <p>No se puede cursar Materia, necesitas:</p>
                                    <div>` +
                                        this.view_conditions_1()
                                    + `</div>
                                </div>
                                <div class="dropdown hidden" id="subject_dropdown_` + this._id + `_1">
                                    <p>Actualizar estado del Examen:</p>
                                    <div style="margin-top: 8px;">
                                        <button id="button_` + this._id +`_0" style="background-color: lightgray;" onclick="subject_` + this._id + `.update(0)" disabled>
                                            Sin Rendir
                                        </button>
                                        <button id="button_` + this._id +`_2" style="background-color: green" onclick="subject_` + this._id + `.update(2)">
                                            Aprobado
                                        </button>
                                    </div>
                                    <div id="subject_dropdown_` + this._id + `_1_1"></div>
                                </div>
                            </div>
        `;

        ubication.innerHTML += yourself;



        document.addEventListener('click', (event) => {

            let subject = document.getElementById("subject_" + this._id);
            let dropdown_0 = document.getElementById("subject_dropdown_" + this._id + "_0");
            let dropdown_1 = document.getElementById("subject_dropdown_" + this._id + "_1");

            let subject_focus = event.target;

            // Iterar sobre los ancestros del elemento actual
            while (subject_focus !== document.body) {
                // Verificar si el elemento actual o alguno de sus ancestros tiene la clase específica
                if (subject_focus.classList.contains('subject_container')) {
                    // Realizar alguna acción si se encuentra la clase específica en algún ancestro
                    subject_focus = subject_focus.id;
                    subject_focus = subject_focus.slice(8);

                    subjects.forEach(element => {
                        if (element._id == subject_focus) {
                            subject_focus = element;
                        }
                    });
                    
                    break; // Detener el bucle porque ya encontramos la clase específica
                }
                // Ir al padre del elemento actual
                subject_focus = subject_focus.parentNode;
            }

            if (!dropdown_1.contains(event.target) && !subject.contains(event.target)) {

                subject.classList.remove("mark_02");
                subject.querySelector(".subject_id").classList.remove("subject_id_red_mark");
                subject.querySelector(".subject_requeriment").classList.add("hidden");

                if(this._status == 0) {
                    if(this.puede_cursar()) {
                        subject.classList.add("mark_01");
                        subject.classList.remove("status_00");
                        subject.querySelector(".subject_status_img").classList.remove("disabled");

                        /* Mostrar el aviso de New */
                        if (this._conditions_01 != 0) {
                            subject.querySelector(".subject_new").classList.remove("hidden");
                        }

                    } else {
                        subject.classList.remove("mark_01");
                        subject.classList.add("status_00");
                        subject.querySelector(".subject_status_img").classList.add("disabled");
                        subject.querySelector(".subject_new").classList.add("hidden");
                    }

                }

                if(this._status > 0) {
                    subject.classList.remove("mark_01");
                }

                if(this._status == 2) {
                    if(!this.puede_aprobar()) {
                        this.update(0);
                        subject.classList.add("mark_01");
                        subject.classList.remove("status_00");
                        subject.querySelector(".subject_status_img").classList.remove("disabled");
                    }
                    if (!this.puede_cursar()) {
                        this.update(0);
                        subject.classList.remove("mark_01");
                        subject.classList.add("status_00");
                        subject.querySelector(".subject_status_img").classList.add("disabled");
                        subject.querySelector(".subject_new").classList.add("hidden");
                    }
                }
  
                if (subject_focus instanceof Subject) {
                    if (!subject_focus.puede_cursar() && subject_focus._status < 1) {
                        if ( subject_focus.es_requisito_faltante_para_cursar(this) ) {
                            subject.classList.add("mark_02");
                            subject.querySelector(".subject_new").classList.add("hidden");
                            subject.querySelector(".subject_requeriment").classList.remove("hidden");
                            subject.querySelector(".subject_id").classList.add("subject_id_red_mark");
                        }
                    } else if (!subject_focus.puede_aprobar() && subject_focus._status == 1) {
                        if ( subject_focus.es_requisito_faltante_para_aprobar(this) ) {
                            subject.classList.add("mark_02");
                            subject.querySelector(".subject_new").classList.add("hidden");
                            subject.querySelector(".subject_requeriment").classList.remove("hidden");
                            subject.querySelector(".subject_id").classList.add("subject_id_red_mark");
                        }
                    }
                }
                

                dropdown_1.classList.add("hidden");
                dropdown_0.classList.add("hidden");

            }
        });

    }

    update(status) {
        
        let subject = document.getElementById("subject_" + this._id);
        const estadoAnterior = this._status;

        /* La siguiente estructura condicional comprueba si el estado actual es válido y si no lo es, lo cambia */
        if(status == undefined) {
            if( !this.puede_cursar() ) {

                /* Actualizar el estado del objeto en JS */
                this._status = 0;
    
                /* Actualizar el estado en la parte visual */
                subject.classList.add("status_00");
                subject.classList.remove("status_02");
                subject.classList.remove("status_03");

            } else if ( !this.puede_aprobar() ) {

                /* Actualizar el estado del objeto en JS */
                this._status = 0;
    
                /* Actualizar el estado en la parte visual */
                subject.classList.remove("status_00");
                subject.classList.remove("status_02");
                subject.classList.remove("status_03");                
            }
        }

        if(status == 0) {

            /* Actualizar el estado del objeto en JS */
            this._status = status;

            /* Actualizar el estado en la parte visual */
            subject.classList.remove("status_00");
            subject.classList.remove("status_02");
            subject.classList.remove("status_03");

            subject.querySelector(".subject_status").classList.remove("subject_status_01");
            subject.querySelector(".subject_status").classList.remove("subject_status_02");
            subject.querySelector(".subject_id").classList.remove("subject_id_01");
            subject.querySelector(".subject_id").classList.remove("subject_id_02");
            subject.querySelector(".subject_status").innerHTML = `<img class="subject_status_img" src="./img/padlock_open.png" alt="padlock" />`;

            document.getElementById("button_" + this._id + "_0").disabled = false;
            document.getElementById("button_" + this._id + "_2").disabled = false;
            document.getElementById("button_" + this._id + "_" + status).disabled = true;

            /* Llamar a los demás objetos que actualicen su estado visual */
            /* Ajustar los estados de las materias afectadas por el último cambio */
            
        }

        if(status == 2) {

            /* Actualizar el estado del objeto en JS */
            this._status = status;

            /* Actualizar el estado en la parte visual */

            subject.classList.add("status_02");
            subject.classList.remove("status_01");

            subject.classList.add("status_02");
            subject.querySelector(".subject_status").classList.remove("subject_status_01");
            subject.querySelector(".subject_id").classList.remove("subject_id_01");
            subject.querySelector(".subject_status").classList.add("subject_status_02");
            subject.querySelector(".subject_id").classList.add("subject_id_02");
            subject.querySelector(".subject_status").innerHTML = "A";

            document.getElementById("button_" + this._id + "_0").disabled = false;
            document.getElementById("button_" + this._id + "_2").disabled = false;
            document.getElementById("button_" + this._id + "_" + status).disabled = true;
/*Esta condicion evita que el efecto del confetti se quede en bucle cada vez que se actualiza la pagina*/
            if (estadoAnterior !== 2) {
            this.crearEfectoFestejo(subject);
            }

            /* Llamar a los demás objetos que actualicen su estado visual */

        }
        /*Aqui se llama a la funcion para que cada vez que se actualiza un status 
        de una materia se guarde en el local storage*/
        guardarEstadoMaterias(subjects);
        
    }
    
    crearEfectoFestejo(subject) {
        // Crear el elemento <img>
        const celeb = document.createElement("img");
        celeb.src = "./img/effect-celebration.gif";
        celeb.alt = "Celebration";
        celeb.className = "celeb-eff";
    
        // Agregar el GIF al body
        subject.appendChild(celeb);
    
        // Esperar el tiempo de duración para eliminar el GIF
        setTimeout(() => {
            celeb.remove(); // Elimina el GIF
        }, 2500);

        // Crear el elemento <img>
        const celeb2 = document.createElement("img");
        celeb2.src = "./img/effect-celebration-2.gif";
        celeb2.alt = "Celebration";
        celeb2.className = "celeb-eff";
    
        // Agregar el GIF al body
        subject.appendChild(celeb2);
    
        // Esperar el tiempo de duración para eliminar el GIF
        setTimeout(() => {
            celeb2.remove(); // Elimina el GIF
        }, 2500);
    }
}