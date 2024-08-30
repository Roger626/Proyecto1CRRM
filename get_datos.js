document.addEventListener('DOMContentLoaded', function() {
    // Cargar las provincias al cargar la página
    cargarProvincias();

    // Obtener los elementos de selección
    var selectProvincia = document.getElementById('provincia');
    var selectDistrito = document.getElementById('distrito');
    
    // Evento para detectar cambios en la selección de provincia
    selectProvincia.addEventListener('change', function() {
        var codigoProvinciaSeleccionada = selectProvincia.value; // Usar el valor del código
        cargarDistritos(codigoProvinciaSeleccionada);
    });

    // Evento para detectar cambios en la selección de distrito
    selectDistrito.addEventListener('change', function() {
        var codigoDistritoSeleccionado = selectDistrito.value; // Usar el valor del código
        cargarCorregimientos(codigoDistritoSeleccionado);
    });
});

// Función para cargar las provincias
function cargarProvincias() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'bd.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var provincias = JSON.parse(xhr.responseText);
            var selectProvincia = document.getElementById('provincia');
            
            provincias.forEach(function(provincia) {
                var option = document.createElement('option');
                option.value = provincia.codigo; // Usar el código como valor
                option.textContent = provincia.nombre; // Mostrar el nombre como texto
                selectProvincia.appendChild(option);
            });
        } else {
            console.error('Error al cargar las provincias: ' + xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Error en la solicitud AJAX.');
    };
    xhr.send();
}

// Función para cargar los distritos según la provincia seleccionada
function cargarDistritos(codigo_provincia) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'bd.php?codigo_provincia=' + encodeURIComponent(codigo_provincia), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var distritos = JSON.parse(xhr.responseText);
            var selectDistrito = document.getElementById('distrito');
            
            // Limpiar las opciones anteriores
            selectDistrito.innerHTML = '<option value="" disabled selected>Seleccione el distrito</option>';
            
            distritos.forEach(function(distrito) {
                var option = document.createElement('option');
                option.value = distrito.codigo; // Usar el código como valor
                option.textContent = distrito.nombre;
                selectDistrito.appendChild(option);
            });
        } else {
            console.error('Error al cargar los distritos: ' + xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Error en la solicitud AJAX.');
    };
    xhr.send();
}

// Función para cargar los corregimientos según el distrito seleccionado
function cargarCorregimientos(codigo_distrito) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'bd.php?codigo_distrito=' + encodeURIComponent(codigo_distrito), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var corregimientos = JSON.parse(xhr.responseText);
            var selectCorregimiento = document.getElementById('corregimiento');
            
            // Limpiar las opciones anteriores
            selectCorregimiento.innerHTML = '<option value="" disabled selected>Seleccione el corregimiento</option>';
            
            corregimientos.forEach(function(corregimiento) {
                var option = document.createElement('option');
                option.value = corregimiento;
                option.textContent = corregimiento;
                selectCorregimiento.appendChild(option);
            });
        } else {
            console.error('Error al cargar los corregimientos: ' + xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Error en la solicitud AJAX.');
    };
    xhr.send();
}
