class Subject {

    constructor(id, nombre, ubication, conditions_01, conditions_02, status) {
        this._id = id;
        this._nombre = nombre;
        this._ubication = ubication;
        this._conditions_01 = conditions_01;
        this._conditions_02 = conditions_02;
        this._status = status;
    }

    getId() {
        return this._id;
    }

    setId(id) {
        this._id = id;
    }

    getNombre() {
        return this._nombre;
    }

    setNombre(nombre) {
        this._nombre = nombre;
    }

    getUbication() {
        return this._ubication;
    }

    setUbication(ubication) {
        this._ubication = ubication;
    }

    getConditions_01() {
        return this._conditions_01;
    }

    setConditions_01(conditions_01) {
        this._conditions_01 = conditions_01;
    }

    getConditions_02() {
        return this._conditions_02;
    }

    setConditions_02(conditions_02) {
        this._conditions_02 = conditions_02;
    }

    getStatus() {
        return this._status;
    }

    setStatus(status) {
        this._status = status;
    }

    puede_cursar() {

        /* Éste método revisa su existe alguna materia que no cumpla los requisitos para CURSAR */
        /* Devuelve TRUE si puede cursar, caso contrario devuelve FALSE */
        let value = true;

        if(this._conditions_01 == 0) {
            value = true;
        }
        if(this._conditions_01 != 0) {
            this._conditions_01.forEach(materia => {

                let subject_id = materia[0];
                let subject_status = materia[1];

                subjects.forEach(material => {

                    if(material._id == subject_id) {

                        if(material._status < subject_status) {
                            value = false;
                        }
                    }
                });                 
            });
        }
        return value;
    }

    puede_aprobar() {

        /* Éste método revisa su existe alguna materia que no cumpla los requisitos para APROBAR */
        /* Devuelve TRUE si puede cursar, caso contrario devuelve FALSE */

        let value = true;

        if(this._conditions_02 == 0) {
            value = true;
        }
        if(this._conditions_02 != 0) {

            this._conditions_02.forEach(materia => {

                let subject_id = materia;

                subjects.forEach(material => {

                    if(material._id == subject_id) {

                        if(material._status < 2) {
                            value = false;
                        }
                    }
                });                 
            });
        }
        return value;
    }

    create() {

        // La siguiente línea de código obtiene la posición de la columna donde debe estár ubicado el objeto
        let ubication = document.getElementById("subject_column_" + this._ubication[0] + "_" + this._ubication[1]);

        // Crear los elementos HTML de cada materia
        let yourself = `
                            <div class="subject_container ` + ((this._conditions_01 == 0) ? 'mark_01' : 'status_00' ) + `" id="subject_` + this._id + `" onclick="subject_` + this._id + `.viewDetails()">
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
                                    <p>Actualizar estado de Materia:</p>
                                    <div style="margin-top: 8px;">
                                        <button id="button_` + this._id +`_0" style="background-color: lightgray;" onclick="subject_` + this._id + `.update(0)" disabled>
                                            Sin cursar
                                        </button>
                                        <button id="button_` + this._id +`_1" style="background-color: orange;" onclick="subject_` + this._id + `.update(1)">
                                            Regular
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

                        /* Mostrar el aviso de Nueva Materia Desbloqueada */
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
                    subject.classList.remove("mark_01");
                    if (this._status < 2) {
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
                }
                

                dropdown_1.classList.add("hidden");
                dropdown_0.classList.add("hidden");

            }
        });

    }

    update(status) {
        
        let subject = document.getElementById("subject_" + this._id);


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
            document.getElementById("button_" + this._id + "_1").disabled = false;
            document.getElementById("button_" + this._id + "_2").disabled = false;
            document.getElementById("button_" + this._id + "_" + status).disabled = true;

            /* Llamar a los demás objetos que actualicen su estado visual */
            /* Ajustar los estados de las materias afectadas por el último cambio */
            
        }

        if(status == 1) {

            /* Actualizar el estado del objeto en JS */
            this._status = status;

            /* Actualizar el estado en la parte visual */

            subject.classList.add("status_02");
            subject.querySelector(".subject_status").classList.remove("subject_status_02");
            subject.querySelector(".subject_id").classList.remove("subject_id_02");
            subject.querySelector(".subject_status").classList.add("subject_status_01");
            subject.querySelector(".subject_status").innerHTML = "R";
            subject.querySelector(".subject_id").classList.add("subject_id_01");

            subject.classList.remove("status_03");

            document.getElementById("button_" + this._id + "_0").disabled = false;
            document.getElementById("button_" + this._id + "_1").disabled = false;
            document.getElementById("button_" + this._id + "_2").disabled = false;
            document.getElementById("button_" + this._id + "_" + status).disabled = true;

            /* Llamar a los demás objetos que actualicen su estado visual */

        }

        if(status == 2) {

            /* Actualizar el estado del objeto en JS */
            this._status = status;

            /* Actualizar el estado en la parte visual */

            subject.classList.add("status_03");
            subject.classList.remove("status_02");

            subject.classList.add("status_03");
            subject.querySelector(".subject_status").classList.remove("subject_status_01");
            subject.querySelector(".subject_id").classList.remove("subject_id_01");
            subject.querySelector(".subject_status").classList.add("subject_status_02");
            subject.querySelector(".subject_id").classList.add("subject_id_02");
            subject.querySelector(".subject_status").innerHTML = "A";

            document.getElementById("button_" + this._id + "_0").disabled = false;
            document.getElementById("button_" + this._id + "_1").disabled = false;
            document.getElementById("button_" + this._id + "_2").disabled = false;
            document.getElementById("button_" + this._id + "_" + status).disabled = true;

            /* Llamar a los demás objetos que actualicen su estado visual */

        }
    }

    viewDetails() {

        /* Declarar variables a usar */

        let subject = document.getElementById("subject_" + this._id);

        let dropdown_0 = document.getElementById("subject_dropdown_" + this._id + "_0");
        let dropdown_1 = document.getElementById("subject_dropdown_" + this._id + "_1");

        subject.classList.remove("mark_01");
        subject.classList.remove("mark_02");
        subject.querySelector(".subject_id").classList.remove("subject_id_red_mark");
        subject.querySelector(".subject_requeriment").classList.add("hidden");
        subject.querySelector(".subject_new").classList.add("hidden");


        if (this._status == 0) {
            if (this.puede_cursar()) {

                this.actualizar_dropdowns();
                dropdown_1.classList.remove("hidden");

            } else {

                this.actualizar_dropdowns();
                dropdown_0.classList.remove("hidden");

            }
        }

        if (this._status == 1) {
            this.actualizar_dropdowns();
            dropdown_1.classList.remove("hidden");
        }

        if (this._status == 2) {
            this.actualizar_dropdowns();
            dropdown_1.classList.remove("hidden");
        }

        this.effects();
        
    }

    view_conditions_1() {

        /* Actualiza la vista de las condiciones para CURSAR una Materia */

        let conditions = "";

        if(!this.puede_cursar()) {
            this._conditions_01.forEach(datos_materia => {
                subjects.forEach(subject => {
                    if(datos_materia[1] == 1 && subject._id == datos_materia[0]) {
                        if(subject._status < datos_materia[1]) {
                            conditions += 
                            `<button class="condition_buton condition_button_no" disabled>`
                                + `<div style="flexgrow: 1">` + subject._id + `</div>`
                                + `<div style="flexgrow: 4; flex-basis: 90%;">` + subject._nombre + `</div>`
                                + `<div style="flexgrow: 1; width: 10%">` + `R` + `</div>`
                            + `</button>`;
                        } else {
                            conditions += 
                            `<button class="condition_buton condition_button_ok" disabled>`
                                + `<div style="flexgrow: 1">` + subject._id + `</div>`
                                + `<div style="flexgrow: 4; flex-basis: 90%;">` + subject._nombre + `</div>`
                                + `<div style="flexgrow: 1; width: 10%">` + `R` + `</div>`
                            + `</button>`;
                        }
                    } 
                    if (datos_materia[1] == 2 && subject._id == datos_materia[0]) {
                        if(subject._status < datos_materia[1]) {
                            conditions += 
                            `<button class="condition_buton condition_button_no" disabled>`
                                + `<div style="flexgrow: 1">` + subject._id + `</div>`
                                + `<div style="flexgrow: 4; flex-basis: 90%;">` + subject._nombre + `</div>`
                                + `<div style="flexgrow: 1; width: 10%">` + `A` + `</div>`
                            + `</button>`;
                        } else {
                            conditions += 
                            `<button class="condition_buton condition_button_ok" disabled>`
                                + `<div style="flexgrow: 1">` + subject._id + `</div>`
                                + `<div style="flexgrow: 4; flex-basis: 90%;">` + subject._nombre + `</div>`
                                + `<div style="flexgrow: 1; width: 10%">` + `A` + `</div>`
                            + `</button>`;
                        }
                    }
                });
            });
        }

        return conditions;
    }

    view_conditions_2() {

        /* Actualiza la vista de las condiciones para APROBAR una Materia */

        let button_3 = document.getElementById("button_" + this._id +"_2");

        let conditions = "";

        if(!this.puede_aprobar()) {
            button_3.style.color = "rgb(83, 7, 21)";
            button_3.style.backgroundColor = "rgb(37, 3, 10)";
            button_3.innerHTML = "Aprobado";
            button_3.disabled = true;
        } else {
            button_3.style.color = "";
            button_3.style.backgroundColor = "green";
            button_3.innerHTML = "Aprobado";
            button_3.disabled = false;
        }

        if(this._conditions_02 != 0) {
            
            this._conditions_02.forEach(datos_materia => {
                subjects.forEach(subject => {
                    if (datos_materia == subject._id && subject._status < 2) {
                        conditions += 
                        `<button class="condition_buton condition_button_no" disabled>`
                            + `<div style="flexgrow: 1">` + subject._id + `</div>`
                            + `<div style="flexgrow: 4; flex-basis: 90%;">` + subject._nombre + `</div>`
                            + `<div style="flexgrow: 1; width: 10%">` + `A` + `</div>`
                        + `</button>`;
                    }
                    if (datos_materia == subject._id && subject._status == 2) {
                        conditions += 
                        `<button class="condition_buton condition_button_ok" disabled>`
                            + `<div style="flexgrow: 1">` + subject._id + `</div>`
                            + `<div style="flexgrow: 4; flex-basis: 90%;">` + subject._nombre + `</div>`
                            + `<div style="flexgrow: 1; width: 10%">` + `A` + `</div>`
                        + `</button>`;
                    }
                });
            });        
        }

        return conditions;
    }

    update_view() {

        let subject = document.getElementById("subject_" + this._id);

        if( !this.puede_cursar ) {
    
            /* Actualizar el estado en la parte visual */
            subject.classList.add("status_00");
            subject.classList.remove("status_02");
            subject.classList.remove("status_03");
    
        }

    }

    effects(click) {

    }

    es_requisito_faltante_para_cursar(materia) {
        /* Comprueba si la Materia ingresada por parámetro es requisito necesario para cursar */
        let resultado = false;
        if(this._conditions_01 == 0) {
            resultado = false;
        } else {
            this._conditions_01.forEach(datos_condicion => {
            if(datos_condicion[0] == materia._id && datos_condicion[1] > materia._status ) {
                resultado = true;
                console.log("La materia: " + materia._nombre + " es requisito necesario para cursar: " + this._id);
            }
        });       
        }
        return resultado;
    }

    es_requisito_faltante_para_aprobar(materia) {
        /* Comprueba si la Materia ingresada por parámetro es requisito necesario para Aprobar */
        let resultado = false;
        if(this._conditions_02 == 0) {
            resultado = false;
        } else {
            this._conditions_02.forEach(datos_condicion => {
                if(datos_condicion == materia._id && materia._status < 2) {
                    resultado = true;
                    console.log("La materia: " + materia._nombre + " es requisito necesario para aprobar: " + this._id);
                }
            });    
        }      
        return resultado;
    }

    actualizar_dropdowns() {

        /* Actualiza el dropdown de cada Materia con los datos correspondientes. */

        let dropdown_0 = document.getElementById("subject_dropdown_" + this._id + "_0");
        dropdown_0.innerHTML = "";

        if (this._status == 0) {

            dropdown_0.innerHTML = 
            `<p>Requerimientos para CURSAR</p>
            <div style="margin-top: 8px;">` + this.view_conditions_1()+ `</div>
            <p style="margin: 10px 0 10px 0" >Requisitos para <br> Promocionar o Rendir Final</p>` +
            `<div class="conditions-butons-div">` + this.view_conditions_2() + `</div>`;

            if(this._conditions_02 != 0) {
                let requeriments = document.getElementById("subject_dropdown_" + this._id + "_1_1");
                requeriments.innerHTML = `<p style="margin: 15px 0 10px 0" >Requisitos para <br> Promocionar o Rendir Final</p>` + this.view_conditions_2();
            }

        } else if (this._status == 1) {


            if(this._conditions_02 != 0) {
                let requeriments = document.getElementById("subject_dropdown_" + this._id + "_1_1");
                requeriments.innerHTML = `<p style="margin: 15px 0 10px 0" >Requisitos para <br> Promocionar o Rendir Final</p>` + this.view_conditions_2();
            }

        }
    }
}