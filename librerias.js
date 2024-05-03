/*LUXON*/

//Variable Global declarada segun documentacion 
const DateTime = luxon.DateTime;

//Calcula el tiempo restante del vehiculo en el lavadero, obteniendo el horario de ingreso, y comparandolo con el horario actual
function calcularTiempoRestante(vehiculo) {
    const duracion = parseFloat(vehiculo.tipoLavado.duracion);
    const horaEntrada = luxon.DateTime.fromISO(vehiculo.horaEntrada);

    // Calcular la hora actual
    const horaActual = luxon.DateTime.now();

    // Calcular la diferencia de tiempo en segundos
    const diferenciaSegundos = horaActual.diff(horaEntrada, 'seconds').toObject().seconds;

    // Calcular el tiempo restante en segundos
    let tiempoRestante = duracion - diferenciaSegundos;

    // Asegurarse de que el tiempo restante no sea negativo
    tiempoRestante = Math.max(tiempoRestante, 0);

    return tiempoRestante;
}



//SWEET ALERT2
function alertaCheck(text1, text2){
    return Swal.fire({
        background: "#d9eef7",        
        position: "top-center",                
        icon: "success",
        title: text1,
        text: text2,        
        showConfirmButton: false,
        timer: 4000,
        customClass :{                   
            popup: "tarjeta",                   
        } ,   
      });
}

//Iconos utilizables: "info", "error"
 function alertaError(icon,text) {
    return Swal.fire({
        icon: icon,
        background: "#d9eef7",
        text: text,
        showConfirmButton: true,    
        customClass: {                   
            popup: "tarjeta",                   
        }
    });
}


//La correccion asincrona de la promesa, luego del then que abre la segunda ventana, se debio a que el tiempo de ejecucion era demasiado rapido
//fue la forma que encontre de detener la ejecucion
function alertaConfirm(titulo, texto, textoConfirm) {
    return Swal.fire({
        title: titulo,
        text: texto,
        icon: "warning",
        background: "#d9eef7",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No",
        confirmButtonText: "Si",
        customClass: {                   
            popup: "tarjeta",                   
        }
    }).then(async(result) => {
        if (result.isConfirmed) {
            
            await Swal.fire({
                background: "#d9eef7",
                title: textoConfirm,
                icon: "success",
                customClass: {                   
                    popup: "tarjeta",                   
                }
            });
            
        } return result.isConfirmed;
    });
}
