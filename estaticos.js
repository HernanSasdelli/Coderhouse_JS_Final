/*FUNCIONES DE CARGA PARA JSON CON FETCH*/


// Carga en el HTML de ingreso de vehiculos, los tipos de vehiculos existentes desde JSON
function cargarTiposVehiculo() {   
    if(obtenerDatosVehiculoLocalStorage()&& SECTION == "ingresoVehiculos"){
        window.location.href = "tiposLavado.html";
    }
    fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            const tiposVehiculo = data.tiposVehiculo;
            const selectTipoVehiculo = document.getElementById("tipo_vehiculo");
            if(!selectTipoVehiculo) return;
            for (const tipo of tiposVehiculo) {
                const option = document.createElement("option");
                option.value = tipo.tipo;
                option.textContent = tipo.tipo;
                selectTipoVehiculo.appendChild(option);
            }
        })
        .catch(error => console.error('Error al cargar tipos de vehículo:', error));
}


//Funcion multitarea (Incorrecto que una funcion haga mas de una tarea)
//Busca la informacion de tipos de lavado con fetch, en el archivo json.
//Crea las tarjetas de tipos de lavado y Las muestra en el HTML(esto ultimo a traves de otra funcion)
//Reacciona al evento del click de la tarjeta
//Funcion que utiliza .then y async y await
function cargarTiposLavado() {
    fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            const tiposLavado = data.tiposLavado;
            const tarjetasContainer = document.getElementById("tarjetas-container");

            for (const lavado of tiposLavado) {
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta");

                const imagen = document.createElement("img");
                imagen.src = lavado.imagenUrl;
                tarjeta.appendChild(imagen);

                const titulo = document.createElement("h3");
                titulo.textContent = lavado.tipo;
                tarjeta.appendChild(titulo);

                const detalle = document.createElement("p");
                detalle.textContent = lavado.detalle;
                tarjeta.appendChild(detalle);

                const costo = document.createElement("p");
                costo.textContent = "Costo: " + lavado.costo;
                tarjeta.appendChild(costo);

                const duracion = document.createElement("p");
                duracion.textContent = "Duración: " + lavado.duracion;
                tarjeta.appendChild(duracion);
                
                tarjeta.addEventListener('click', async function() {
                    if(obtenerDatosVehiculoLocalStorage()){
                        tipoLavadoPreCarga = lavado;
                        await alertaCheck("Tipo de lavado seleccionado", lavado.tipo);
                        ingresarLavadero();
                       
                    }  
                });
                if(tarjetasContainer){
                    tarjetasContainer.appendChild(tarjeta);
                }        
            } 
        })
        .catch(error => console.error('Error al cargar tipos de lavado:', error));
}
