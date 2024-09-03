function soloLetras(input) {
    // Expresión regular que permite solo letras (mayúsculas y minúsculas) y espacios
    var soloLetras = /^[a-zA-Z\s]*$/;

    // Verifica si el valor del input coincide con la expresión regular
    if (!soloLetras.test(input.value)) {
        // Si no coincide, muestra un mensaje de error
        document.getElementById("msgError").style.display = "block";
        
        // Elimina el último carácter ingresado que no es válido
        input.value = input.value.slice(0,-1);
    } else {
        // Si todo está bien, oculta el mensaje de error
        document.getElementById("msgError").style.display = "none";
    }
}

function soloNumeros(input){
    var soloNumeros = /^\d+$/;

    if(!soloNumeros.test(input.value)){
        input.value = input.value.slice(0,-1);
    } 
}

function impuestoRenta(input){
    sueldo = document.getElementById("sueldo").value;
    console.log("sueldo: " + sueldo);

    impuesto = sueldo*13;
    
    if (impuesto ? 0 : 11000){
        console.log("no paga")
    }
}

