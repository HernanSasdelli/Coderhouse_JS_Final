/* VALIDACIONES */

//Vallida los datos de ingreso de vehiculo limitando caracteres (Basico)
//Manejado con try catch, siendo la funcion Ingreso Vehiculos quien controla los errores
function validarIngresoVehiculo() {
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const patente = document.getElementById("patente").value;
    const tipoVehiculo = document.getElementById("tipo_vehiculo").value;

    if (marca !== null && verificarLongitud(marca) &&
        modelo !== null && verificarLongitud(modelo) &&
        patente !== null && 
        tipoVehiculo !== "") {

        if (!verificarPatente(patente)) {
            throw new Error("La patente ingresada ya está en proceso de lavado. Por favor, ingrese una patente diferente");
        }

        return {
            marca: marca,
            modelo: modelo,
            patente: patente,
            tipoVehiculo: tipoVehiculo
        };
    } else {
        throw new Error("Los datos están incompletos o incorrectos");
    }
}

//verifica el largo de los datos ingresados
function verificarLongitud(cadena) {
    if (cadena.length >= 2 && cadena.length <= 20) {
        return true; 
    } else {
        throw new Error("Ingrese entre 2 y 20 caracteres");
    }
}

//Verifica en el array de vehiculos cargado en el LS si ya hay un vehiculo ingresado con esa patente
function verificarPatente(patente) {
    const vehiculos = obtenerArrayDesdeLocalStorage("vehiculos");
    const patenteExistente = vehiculos.some(vehiculo => vehiculo.patente === patente);

    if (patenteExistente) {
        return false;
    }

    return patente.length >= 6 && patente.length <= 8;
}

