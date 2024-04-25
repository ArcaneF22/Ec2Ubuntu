<?php
    include '../conx.php';
    include '../verify/verify.php';

 if($Verified == "FOUND"){

    if($Got['TYPE'] == "ALL"){
        $sql = "SELECT * FROM images WHERE status = 0";
    } else {
        $sql = "SELECT * FROM images WHERE status = 0 AND type = '".$Got['TYPE']."' ";
    }

    $result = $conx->query($sql);
    $feedback = [];

        if ($result->num_rows > 0) {
            while ($i = $result->fetch_assoc()) {

                if($i['status']==0){
                    $status = "Active";
                } else {
                    $status = "Inactive";
                }

                $feedback[] = array(
                                'id' =>             $i['id'],
                                'name' =>           $i['name'],
                                'type' =>           $i['type'],
                                'path' =>           $i['path'],
                                'status' =>         $status,
                            );
            }
        } else {
            $feedback = "Err"; 
        }
        
 } else {
    $feedback = "Err";
 }

 echo json_encode($feedback, true);

?>