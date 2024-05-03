/*MANIPULACION DEL LOCAL STORAGE*/


//Graba un objeto en el local storage
function guardarEnLocalStorage(clave, objeto) {
    if (typeof objeto === 'object' && objeto !== null) {
        const objetoString = JSON.stringify(objeto);
        localStorage.setItem(clave, objetoString);
    
    }
}


//Recupera datos de un vehiculo cargado en localStrorage durante la precarga al lavadero
function obtenerDatosVehiculoLocalStorage() {
    const datosVehiculoString = localStorage.getItem('datosVehiculo');
    if (datosVehiculoString !== null) {
        return JSON.parse(datosVehiculoString);
    } else {
        return null;
    }
}

//Obtiene datos de todo el array de vehiculos ya ingresados en el lavadero
function obtenerArrayDesdeLocalStorage(clave) {
    const arrayJSON = localStorage.getItem(clave);    
    if (!arrayJSON) {// Si no hay ningún valor almacenado lo devuelve vacio, 
        return [];
    }  
    return JSON.parse(arrayJSON);  // si hay info la devuelvo en un array 
}



//elimina los recientes en el local storage de datos de vehiculos y tipos de lavado
//USO en BOTON CANCELAR tiposLavado.html
function reiniciaVariables (){   
    localStorage.removeItem('datosVehiculo');
    tipoLavadoPreCarga = null;   
} 


//Elimina todos los objetos vehiculo del array cargado en el Local Storage
function vaciarLavadero() {
    localStorage.removeItem('vehiculos');
    vehiculos = [];
}


//Cuenta Cantidad de vehiculos en el array y los retorna
function contarVehiculos() {
    const vehiculos = obtenerArrayDesdeLocalStorage('vehiculos');
    return vehiculos.length;
}
