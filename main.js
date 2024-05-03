//Varuables globales para el manejo de la carga y descarga del LS
const vehiculoPreCarga = {};
let tipoLavadoPreCarga ;
let vehiculos = [];


// Carga de tarjetas de tipo de lavaddo al iniciar 
window.addEventListener("load", cargarTiposVehiculo);

// Carga de tarjetas de tipo de lavaddo al iniciar 
window.addEventListener("load", cargarTiposLavado);

//Evento LOAD que carga los vehiculos ingressados en el lavadero en la variable global, y luego los muestra en pantalla
window.addEventListener("load",function() {
    vehiculos = obtenerArrayDesdeLocalStorage('vehiculos');
    cargarVehiculosEnHTML(vehiculos);
});
// Carga de tarjetas de tipo de lavaddo al iniciar 
window.addEventListener("load", cargarTiposVehiculo);

// Carga de tarjetas de tipo de lavaddo al iniciar 
window.addEventListener("load", cargarTiposLavado);



/*INGRESO*/
//Manipula el ingreso de datos verificando que sean correctos
//Controla los errores que se pueden generar por el ingreso incorrecto de datos
async function  ingresoVehiculo() {
    try {
        const vehiculoAux = validarIngresoVehiculo();
        cargarDatosVehiculo(vehiculoAux); // precarga el objeto vehiculo   
        guardarEnLocalStorage('datosVehiculo', vehiculoAux); // nombre del dato + objeto cargado(vehiculo)
        const ok = await alertaCheck("Patente:" + "\n" + vehiculoAux.patente + "\n" + vehiculoAux.tipoVehiculo + "\n" + vehiculoAux.marca + ",\n " + vehiculoAux.modelo, "Vehiculo ingresado Correctamente")
        if(ok){
            window.location.href = "tiposLavado.html";
        }
    } catch (error) {
        alertaError("error", error.message);        
    }
}
//carga el vehiculo que ingressa el usuario en una variable global
function cargarDatosVehiculo(vehiculoAux) {
    vehiculoPreCarga.marca = vehiculoAux.marca;
    vehiculoPreCarga.modelo = vehiculoAux.modelo;
    vehiculoPreCarga.patente = vehiculoAux.patente;
    vehiculoPreCarga.tipoVehiculo = vehiculoAux.tipoVehiculo;
}

// Menejo del formulario
const botonIngresar = document.querySelector("#ingresarVehiculo");
const formulario = document.getElementById('formularioAuto');
if(formulario){
    formulario.addEventListener("submit", function(e) {
        e.preventDefault(), ingresoVehiculo()
    });
}


//Boton para cancelar carga, antes de elegir el tipo de lavado
const btnCancelar = document.getElementById("cancelar");
if(btnCancelar && SECTION == "tiposLavado"){//detiene un blucle entre redireccionamientos
    btnCancelar.addEventListener("click",function(){
        reiniciaVariables()
        window.location.href = "ingresoVehiculo.html"
    });
}



//Recolecta los datos ingresados a lo largo de la ejecucion y los ingresa al lavadero 
//Inicializa el servicio.
function ingresarLavadero(){
    if(localStorage.getItem('datosVehiculo')===undefined ||localStorage.getItem('datosVehiculo')===null)
    {
        alertaError("info","Debe ingresar un vehiculo antes!");
        return;
    }
    if(tipoLavadoPreCarga===undefined){
        alertaError("info","Por favor, seleccione un tipo de lavado");
        return;
    }
    let vehiculoAux = obtenerDatosVehiculoLocalStorage()

    vehiculoAux.horaEntrada = DateTime.now().toFormat('HH:mm:ss');    
    vehiculoAux.tipoLavado = tipoLavadoPreCarga; 
    

    alertaCheck( "Ingreso a lavadero: "+ vehiculoAux.horaEntrada +" hs."+"\n"+"Vehiculo patente: "+vehiculoAux.patente +"\n Ingresa para: "+vehiculoAux.tipoLavado.tipo)
    .then(() => {      
        window.location.href = "lavadero.html";
    });
    vehiculos = obtenerArrayDesdeLocalStorage("vehiculos");
     vehiculos.push(vehiculoAux);
     guardarVehiculosEnLocalStorage(vehiculos);
     reiniciaVariables();
    

}


//Guarda un vehiculo cargado en ingresarVehiculo.html, en el LS
function guardarVehiculosEnLocalStorage(vehiculosArray) {
    if (Array.isArray(vehiculosArray)) {//verifica que sea array
            localStorage.setItem('vehiculos', JSON.stringify(vehiculosArray));
                }
 }



//Evento click sobre boton que redirecciona al INDEX a traves de una funcion
const volverMenu = document.getElementById("menuPrincipal");
if(volverMenu){//controla el Dom para que no se cargue en todas las paginas
    volverMenu.addEventListener("click",volverMenuPrincipal);
}

function volverMenuPrincipal(){        
         window.location.href =("index.html");     
}

// Genera un boton para retirar el vehiculo del lavadero
//Funcion que utiliza promesas
function crearBotonRetirar(vehiculo) {
    const botonRetirar = document.createElement("button");
    botonRetirar.textContent = "Retirar";
    botonRetirar.classList.add("retirar"); // Agregar clase de estilo

    botonRetirar.addEventListener("click", async function() {
        
        if (parseFloat(document.getElementById(`tiempo-${vehiculo.patente}`).textContent) === 0) {
           
             await alertaCheck("Vehiculo patente: "+vehiculo.patente +"\n RETIRADO","Abonar: "+vehiculo.tipoLavado.costo);
             eliminarVehiculo(vehiculo.patente);
           
        } else {
           const confirm = await alertaConfirm("El vehículo no está listo.","¿Desea forzar el retiro?","Vehiculo patente: "+vehiculo.patente +"\n RETIRADO")
            if (confirm) {
                eliminarVehiculo(vehiculo.patente); 
            }             
        }
    });

    return botonRetirar;
}


//Elimina un item del array, a traves de un identificador pasado por parametro
function eliminarVehiculo(patente) {
    let vehiculos = obtenerArrayDesdeLocalStorage("vehiculos");

    // Buscar el índice del vehículo en el array
    const index = vehiculos.findIndex(vehiculo => vehiculo.patente === patente);

    // Si se encontró el vehículo, eliminarlo del array
    if (index !== -1) {
        vehiculos.splice(index, 1);
        guardarVehiculosEnLocalStorage(vehiculos); // Guardar el array actualizado en el LocalStorage
        window.location.reload(); //Recarga pantalla
        
    } else {
        console.error(`No se encontró el vehículo con patente ${patente}`);
    }
}


//Funcion responsable de visualizar los vehiculos en servicio y se actualiza constantemente
//Crea tarjeta de vehiculos
//Actualiza cada un segundo, para visualizar el tiempo restante de los servicios en tiempo real
function cargarVehiculosEnHTML(vehiculos) {
    const listaVehiculosContainer = document.getElementById("listadoVehiculos");
    // Verificar si no hay vehículos
    if (vehiculos.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay vehículos para lavar";
        if(listaVehiculosContainer){
            listaVehiculosContainer.appendChild(mensaje);
        }
        
        return;
    }
    vehiculos.forEach(vehiculo => {
        const itemLista = document.createElement("li");
        const duracion = parseFloat(vehiculo.tipoLavado.duracion);

        if (!isNaN(duracion)) {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta");

            const infoVehiculo = document.createElement("div");
            infoVehiculo.innerHTML = `
                <strong> ${vehiculo.patente} - ${vehiculo.marca} ${vehiculo.modelo} </strong><br>
                Tipo de Vehículo: ${vehiculo.tipoVehiculo}<br>
                Tipo de Lavado: ${vehiculo.tipoLavado.tipo}<br>
                Costo: ${vehiculo.tipoLavado.costo}<br>
                Duración: <span id="tiempo-${vehiculo.patente}">${calcularTiempoRestante(vehiculo)}</span>
            `;

            const botonRetirar = crearBotonRetirar(vehiculo);

            tarjeta.appendChild(infoVehiculo);
            tarjeta.appendChild(botonRetirar);

            itemLista.appendChild(tarjeta);
            if (listaVehiculosContainer) {
                listaVehiculosContainer.appendChild(itemLista);
            }

        } else {
            console.error(`Error: Duración no válida para el vehículo ${vehiculo.patente}`);
        }
    });

    // Actualizar el tiempo restante cada segundo
    setInterval(() => {
        vehiculos.forEach(vehiculo => {
            const tiempoRestante = document.getElementById(`tiempo-${vehiculo.patente}`);
            if (tiempoRestante) {
                tiempoRestante.textContent = Math.floor(calcularTiempoRestante(vehiculo));
            }
        });
    }, 1000);
}



//Boton para cerrar la aplicacion, avisa si existen vehiculos en servicio, y pregunta si retirarlos y cerrar
async function cerrarLavadero() {
    const cantidadVehiculos = contarVehiculos();

    if (cantidadVehiculos === 0) {
        await alertaError("info","Hasta mañana!");
        window.location.href = "index.html";
    } else {
        alertaConfirm("Hay "+ (cantidadVehiculos) +" vehículos en el lavadero.", "¿Desea forzar la salida y cerrar?","El lavadero ha sido vaciado")
        .then((confirmed) => {
            if (confirmed) {
                vaciarLavadero();
            } 
        });
    }
}



// Seleccionar el botón de cerrar
const cerrarBtn = document.getElementById("cerrar");

// Agregar un event listener para el clic en el botón de cerrar
if (cerrarBtn) {
    cerrarBtn.addEventListener("click", cerrarLavadero);
}
