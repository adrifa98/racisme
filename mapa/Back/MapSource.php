<?php
include('conexiondb.class.php');
$func = $_GET['func'];
switch ($func) {
    case 'GetMap':
        getMapaData();
        break;
    case 'AddMap':
        addMapaData();
        break;
    
    default:
        # code...
        break;
}
    function getMapaData(){
        $conexion = new conexiondb();
        $query = "SELECT * FROM messages;";
        $result = $conexion->query($query);
        $conexion->desconectar();
        if(mysqli_num_rows($result)>0){
            while($r = mysqli_fetch_assoc($result)) {
                $rows[] = $r;
            }
            echo json_encode($rows);
        }
    }

    function addMapaData(){
        $name = $_GET['nom'];
        $text = $_GET['exp'];
        $lat = $_GET['lat'];
        $lon = $_GET['lon'];
        $pais = $_GET['pais'];
        $conexion = new conexiondb();
        $query = "INSERT INTO `racism-web`.`messages` (`Name_person`, `long`, `lat`, `Message`, `Pais`) VALUES ('$name', '$lon', '$lat', '$text', '$pais');";
        $result = $conexion->query($query);
    }
?>