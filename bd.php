<?php
$servidor = "localhost";
$usuario = "d42024";
$password = "1234";
$base_datos = "planilla";

$conn = new mysqli($servidor, $usuario, $password, $base_datos);

// Verificar si se ha enviado el parámetro de codigo_distrito
if (isset($_GET['codigo_distrito'])) {
    $codigo_distrito = $_GET['codigo_distrito'];

    // Consulta para obtener los corregimientos del distrito seleccionado usando codigo_distrito
    $query = "SELECT nombre_corregimiento FROM corregimiento WHERE codigo_distrito = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $codigo_distrito); // Enlaza el parámetro
    $stmt->execute();
    $result = $stmt->get_result();

    $corregimientos = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $corregimientos[] = $row['nombre_corregimiento'];
        }
    }
    echo json_encode($corregimientos);
} elseif (isset($_GET['codigo_provincia'])) {
    $codigo_provincia = $_GET['codigo_provincia'];

    // Consulta para obtener los distritos de la provincia seleccionada usando codigo_provincia
    $query = "SELECT codigo_distrito, nombre_distrito FROM distrito WHERE codigo_provincia = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $codigo_provincia); // Enlaza el parámetro
    $stmt->execute();
    $result = $stmt->get_result();

    $distritos = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            // Almacenar tanto el código como el nombre del distrito
            $distritos[] = array('codigo' => $row['codigo_distrito'], 'nombre' => $row['nombre_distrito']);
        }
    }
    echo json_encode($distritos);
} else {
    // Si no se envía el codigo_provincia, se devuelven todas las provincias
    $query = "SELECT codigo_provincia, nombre_provincia FROM provincia";
    $result = $conn->query($query);

    $provincias = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            // Almacenar tanto el código como el nombre de la provincia
            $provincias[] = array('codigo' => $row['codigo_provincia'], 'nombre' => $row['nombre_provincia']);
        }
    }
    echo json_encode($provincias);
}

$conn->close();
