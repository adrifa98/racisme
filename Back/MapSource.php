<?php

include('conexiondb.class.php');
switch ($_GET['func']) {
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
        $name = $_GET['name'];
        $text = $_GET['text'];
        $conexion = new conexiondb();
        $query = "INSERT INTO `racism-web`.`messages` (`Name_person`, `long`, `lat`, `Message`) VALUES ('$name', '33333', '33333', '$text');";
        $result = $conexion->query($query);
    }
?>