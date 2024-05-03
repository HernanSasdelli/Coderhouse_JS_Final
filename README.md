Lavadero de autos

La razón por la cual elegí este tipo de aplicación es porque quería realizar un tipo diferente de página que un e-commerce. Ya implementé varios en lo que va de mi estudio, y si bien el flujo no es muy diferente,
quería que la temática sea distinta.

Funcionamiento.
El programa inicia con un menú de opciones:
Ingresar vehículo: Inicia el proceso de interacción con los datos ingresados por el usuario para disponer del servicio de lavado. Maneja validaciones simples de datos y un flujo casi automático de cambio de
pantallas, para completar el circulo del servicio. La patente ingresada, se utilizará como identificador único de cada vehículo.

Tipos de Lavado: Permite utilizar la página de selección de tipos de lavados, como un muestrario de los servicios disponibles.

Lavadero: Se visualizan todos los vehículos en servicio, o, si no existen vehículos en servicio, se muestra la leyenda de “No hay vehículos para lavar”.

Hora de cerrar: Este botón simula el botón de “vaciar carrito” en un e-commerce, avisa de la cantidad de autos que están en servicio dentro de la aplicación, y le da la opción al usuario de sacarlos de 
la aplicación a todos forzadamente, por mas que no hayan terminado sus respectivos servicios.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Flujo funcionamiento
Al presionar el botón de ingreso de vehículos en index.html
-Redirecciona a ingresoVehiculo.html

-Formulario, ingresar caracteres, ejemplo: Ford, Chevrolet, Renault (no están delimitadas las palabras y los caracteres especiales), el ancho permitido es de 2 a 20 caracteres en los tres campos,
“Marca”, “Modelo”, “Patente”. 

-Seleccionar un tipo de vehículo del menú desplegable
(Cualquier información diferente a la delimitada, información faltante, o en el caso que la patente ingresada ya se encuentre en servicio, la aplicación contestara con distintos tipos de errores).

-Una vez cargada la información deseada, presionar el botón de Ingresar Vehículo, el cual, si la información es correctamente verificada, un cartel le mostrara la información ingresada en pantalla y se 
redireccionara a la página de selección de lavado. 

-La selección de lavado cuenta con un botón de “Volver al Menú Principal”, que regresa al index.html, pero si se trata de ingresar nuevamente a la pagina de “Ingreso de vehículo”, va a volver a la pagina de 
“Tipos de Lavado” ya que datos del vehículo ya han sido cargados. La única forma de cancelar el flujo es el botón “Cancelar”, el elimina los datos temporales.

-Una vez seleccionado el tipo de Lavado, un nuevo cartel mostrara, el tipo de servicio seleccionado, seguido de otro que indica todos los datos ingresados, y luego se redirecciona a la página lavadero.html

-En esta pagina se visualizan los vehículos en servicio, el tiempo restante para concluir y un botón retirar para cada uno de los vehículos cargados, que en caso de que ya estén listos (contador en cero),
enviara un mensaje con el detalle del servicio y el monto a abonar, y eliminara el vehículo de la lista. En caso de que el contador siga funcionando, el usuario podrá determinar si desea dejarlo terminar,
o forzar su retiro, en tal caso solo informa que el vehículo fue retirado y lo borra de la lista.

Botón Tipos de lavado:
-Es un muestrario de los servicios disponibles

Botón Lavadero:
-Muestra vehículos en servicio

Botón Hora de cerrar:
-Botón cerrar: permite vaciar el lavadero, eliminando los vehículos en servicio.
Saludos de cierre de programa, regresa al índex.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Información técnica
-Uso de 5 paginas HTML, y 5 paginas JS
-Sin código JS y CSS dentro del Html
-Arrays, objetos, temporizadores solo en conjunto de las librerías externas.
-Manejo del Local Storage para persistencia de datos.
-Promesas: utilizadas para cargas de datos, alertas, y redireccionamiento
-Async & Await
-Fetch y then
-Bloque try catch

Uso de librerías externas:
-Luxon
-Sweet Alert 2
Ambas implementadas por CDN, código Javascript en librerías.js

Ejemplos más relevantes:
-Función ingresoVehiculo(), línea 29 main.js
La función es asincrónica, con la alerta que indica que el vehículo se ingreso correctamente, espera a que eso suceda para redireccionar al siguiente paso.
A su vez maneja try catch, para el manejo de errores, provenientes de las funciones que tiene dentro. 

-Se utilizo fetch con .then, para la carga de datos desde archivo .JSON, todo el código relacionado esta en la hoja de estaticos.js
En este caso los catch se manejaron con errores en la consola directamente. Sin interactuar con el usuario ya que se deben a errores de funcionamiento.

-Se utilizo async await para detener la ejecución durante las alertas Swal2, ejemplos en la hoja librerías.js.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Puntos a mejorar:
Al momento de limpiar, ordenar y documentar el código, visualice algunas mejoras a implementar, que no fueron hechas por falta de tiempo, y que se deben al ir modificando el código en base al nuevo
conocimiento adquirido clase a clase. Propio de la evolución del código.

-Variables globales: el uso de variables globales originalmente se utilizo para interactuar entre las páginas, cuando no eran tan automáticos los cambios de uno a otra pantalla,
tal vez utilizaría solo el Local Storage.

-Dos mega funciones que hacen muchas cosas: cargarTiposLavado(), línea 31 de estaticos.js, si bien me encanto hacerla, tuve problemas al querer atomizarla por lo que deje que siguiera funcionando tan extensa,
pero como detallo en el código, hace demasiadas cosas. Lo mismo con la función cargarVehiculosEnHtml(), línea 169 de main.js, es la función que recarga el tiempo en tiempo real. 

-El manejo de try/catch en validaciones.js: si bien considero que lo implementado no esta tan mal, podría haber estado mejor, hay código que me hace ruido y podría estar más simplificado.

-Contador de tiempo en lavadero: cuando llega a cero debería decir algo como vehículo listo, no solo el cronometro en 0, y tal vez agregar una fila, para tener un máximo de servicios produciéndose al mismo tiempo,
y que luego de que estos estén terminados, arranquen los siguientes en la fila, lo que haría una lógica más diferente al e-commerce.

-Botón cancelar de tiposLavado.html: me gustaría que cuando entro en la página desde el index, sin antes cargar un vehículo el botón no se visualice.


