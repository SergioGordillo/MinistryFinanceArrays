
let dnis = [];
let estadosciviles = [];
let ingresos = [];
let impuestos = [];
let fechas = [];

function darDeAlta() {

    let dni = document.getElementById("dni").value;

    if (validarDNI(dni) == true) {

        let estadocivil = document.getElementById("estadocivil").value;

        if (validarEstadoCivil(estadocivil) == true) {

            let ingreso = document.getElementById("ingresos").value;

            if (validarNumeroEnteroPositivo(ingreso) == true) {
                dnis.push(dni);
                estadosciviles.push(estadocivil);
                ingresos.push(parseInt(ingreso));
                mensaje.innerHTML = "Los datos DNI, estado civil e ingresos del usuario han sido añadidos a nuestra BBDD. Gracias";
            } else {
                let mensaje = document.getElementById("mensaje");
                mensaje.innerHTML = "El ingreso insertado no tiene el formato adecuado";
            }

        } else {
            let mensaje = document.getElementById("mensaje");
            mensaje.innerHTML = "El estado civil insertado no tiene el formato adecuado";
        }

    } else {
        let mensaje = document.getElementById("mensaje");
        mensaje.innerHTML = "El DNI insertado no tiene el formato adecuado";
    }



}


function resumirDatosContribuyentes() { //Función que te da número de contribuyentes, media de ingresos, ingreso más alto e ingreso más bajo

    let numeroTotal = calcularNumeroTotalContribuyentes(dnis);
    let mediaIngresos = calcularMediaIngresosContribuyentes(ingresos);
    let ingresoMaximo = calcularIngresoMasAlto(ingresos);
    let ingresoMinimo = calcularIngresoMasBajo(ingresos);

    let mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = "El número total de contribuyentes es de " + numeroTotal + ". La media de ingresos de los contribuyentes ha sido de " + mediaIngresos + ". El ingreso máximo de los contribuyentes ha sido de " + ingresoMaximo + ". El ingreso mínimo de los contribuyentes ha sido de " + ingresoMinimo + ".<br>";


}

function calcularImpuestos() { //Función que me permite calcular los impuestos que ha de pagar cada contribuyente

    let dni = "";
    let estadocivil = "";
    let ingreso = 0;
    let iva = 0;
    let ivarebajado = 0;
    let cantidadapagar = 0;


    for (let i = 0; i < dnis.length; i++) { //Recorro el array de DNIs
        dni = dnis[i];
        ingreso = ingresos[i];
        estadocivil = estadosciviles[i];

        if (ingreso > 0 && ingreso < 15000) {
            iva = 5;
        } else if (ingreso >= 15000 && ingreso < 25000) {
            iva = 10;
        } else if (ingreso >= 25000 && ingreso < 40000) {
            iva = 20;
        } else if (ingreso >= 40000) {
            iva = 30;
        }

        if (estadocivil == "soltero" | estadocivil == "viudo") {
            ivarebajado = iva - 2;
            cantidadapagar = (ingreso * ivarebajado) / 100;
            impuestos.push(cantidadapagar);
            let mensaje = document.getElementById("mensaje");
            mensaje.innerHTML += "Contribuyente: " + dni + " Impuestos: " + ivarebajado + "%. Cantidad total a pagar: " + cantidadapagar + "€. <br>"
        } else if (estadocivil == "casado" | estadocivil == "divorciado") {
            ivarebajado = iva - 5;
            cantidadapagar = (ingreso * ivarebajado) / 100;
            impuestos.push(cantidadapagar);
            let mensaje = document.getElementById("mensaje");
            mensaje.innerHTML += "Contribuyente: " + dni + " Impuestos: " + ivarebajado + "%. Cantidad total a pagar: " + cantidadapagar + "€. <br>"
        }
    }
}

function darCitaPrevia() {

    let fechaActual = calcularFechaActual();
    fechaActual.setHours(0); //Seteo horas, minutos, segundos y ms para que la fecha sea por defecto
    fechaActual.setMinutes(0);
    fechaActual.setSeconds(0);
    fechaActual.setMilliseconds(0);
    let ultimaPosicion = new Date();
    let penultimaPosicion = new Date();
    let fechaReserva = new Date();
    fechaReserva.setHours(0); //Seteo horas, minutos, segundos y ms para que la fecha sea por defecto
    fechaReserva.setMinutes(0);
    fechaReserva.setSeconds(0);
    fechaReserva.setMilliseconds(0);

    if (fechas.length == 0) {
        fechas.push(fechaActual);
        let mensaje = document.getElementById("mensaje");
        mensaje.innerHTML += "La cita previa ha sido dada para el día " + fechaActual + ".<br>";
    } else {
        ultimaPosicion = fechas[fechas.length - 1]; //Accedo a la última y a la penúltima posición
        penultimaPosicion = fechas[fechas.length - 2];

        if (penultimaPosicion) { //Si la penúltima posición existe 
            if (ultimaPosicion.getTime() == penultimaPosicion.getTime()) {
                let diaSemanaUltimaPosicion=ultimaPosicion.getDay(); //Le saco el día de la semana
                
                if (diaSemanaUltimaPosicion == 5) { //Si es sábado me reservas para el lunes
                    fechaReserva = new Date(ultimaPosicion.getTime() + (3 * (1000 * 60 * 60 * 24))); //Lo hago con el getTime para que sea más exacto
                    fechas.push(fechaReserva);
                    let mensaje = document.getElementById("mensaje");
                    mensaje.innerHTML += "La cita previa ha sido dada para el día " + fechaReserva + ".<br>";

                } else if (diaSemanaUltimaPosicion == 6) { //Si es sábado me reservas para el lunes
                    fechaReserva = new Date(ultimaPosicion.getTime() + (2 * (1000 * 60 * 60 * 24)));
                    fechas.push(fechaReserva);
                    let mensaje = document.getElementById("mensaje");
                    mensaje.innerHTML += "La cita previa ha sido dada para el día " + fechaReserva + ".<br>";
                } else if (diaSemanaUltimaPosicion == 0) { //Si es domingo, me reservas para el lunes
                    fechaReserva = new Date(ultimaPosicion.getTime() + (1 * (1000 * 60 * 60 * 24)));
                    fechas.push(fechaReserva);
                    let mensaje = document.getElementById("mensaje");
                    mensaje.innerHTML += "La cita previa ha sido dada para el día " + fechaReserva + ".<br>";
                } else { //Si no es ni viernes, ni sábado, ni domingo
                    fechaReserva = new Date(ultimaPosicion.getTime() + (1 * (1000 * 60 * 60 * 24)));
                    fechas.push(fechaReserva);
                    let mensaje = document.getElementById("mensaje");
                    mensaje.innerHTML += "La cita previa ha sido dada para el día " + fechaReserva + ".<br>";
                }
            } else { //Si última y penúltima posición no son iguales, significa que sólo hay una reserva para el día de la última posición, es decir, que puedo realizar otra reserva ese día
                fechaReserva = ultimaPosicion;
                fechas.push(fechaReserva);
                let mensaje = document.getElementById("mensaje");
                mensaje.innerHTML += "La cita previa ha sido dada para el día " + fechaReserva + ".<br>";

            }
        } else { //Si penúltima posición no existe le meto directamente la fecha actual (hay hueco entonces para reservar en el día de hoy)
            fechas.push(fechaActual);
            let mensaje = document.getElementById("mensaje");
            mensaje.innerHTML += "La cita previa ha sido dada para el día " + fechaReserva + ".<br>";
        }

    }
}



//Funciones auxiliares para Dar de alta un DNI

function validarDNI(dni) { //Valida DNI con 8 números y una letra al final
    let reg = new RegExp(/^[0-9]{8}[T|R|W|A|G|M|Y|F|P|D|X|B|N|J|Z|S|Q|V|H|L|C|K|E]$/);
    correcto = false;

    if (reg.test(dni)) {
        correcto = true;
    }

    return correcto;

}

function validarEstadoCivil(estadocivil) { //Función que valida el estado civil de una persona
    let reg = new RegExp(/^(soltero|casado|viudo|divorciado)$/i);
    correcto = false;

    if (reg.test(estadocivil)) {
        correcto = true;
    }

    return correcto;

}

function validarNumeroEnteroPositivo(ingreso) { //Valida un número entero positivo mayor que 0
    let reg = new RegExp(/^([0-9])*$/);
    correcto = false;

    if (reg.test(ingreso) && ingreso > 0) {
        correcto = true;
    }

    return correcto;

}

//Funciones auxiliares para obtener estadísticas de los contribuyentes

function calcularNumeroTotalContribuyentes(dnis) { //Función que te calcula el número total de contribuyentes

    let numeroTotal = dnis.length; //.length sólo tiene paréntesis para cadenas

    return numeroTotal;
}

function calcularMediaIngresosContribuyentes(ingresos) {

    let ingresosTotales = 0;

    for (i = 0; i < ingresos.length; i++) {
        ingresosTotales += ingresos[i];
    }

    let numeroTotalDNIs = calcularNumeroTotalContribuyentes(dnis);

    let mediaIngresos = ingresosTotales / numeroTotalDNIs;

    return mediaIngresos;
}

function calcularIngresoMasAlto(ingresos) { //Función que te permite calcular el ingreso más alto del total de contribuyentes

    let ingresoMaximo = Math.max(...ingresos);

    return ingresoMaximo;

}

function calcularIngresoMasBajo(ingresos) { //Función que te permite calcular el ingreso más bajo del total de contribuyentes

    let ingresoMinimo = Math.min(...ingresos);

    return ingresoMinimo;

}

//Funciones auxiliares para calcular la cita previa

function calcularFechaActual() { //Función que te devuelve la fecha actual del sistema
    let fecha = new Date(); //Cojo la fecha actual del sistema

    return fecha;

}



