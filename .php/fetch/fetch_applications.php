<?php
    include '../conx.php';
    include '../verify/verify.php';

 if($Verified == "FOUND"){
    $sql = "SELECT app.id AS appID,
                    app.name AS appName,
                    img.id AS appImageID,
                    img.path AS appImage,
                    com.name AS appCompany,
                    app.details AS appDetails,
                    app.status AS appStatus,
                    COUNT(acc.id) AS appCountAccount
            FROM applications AS app
            LEFT JOIN accounts AS acc ON acc.appID = app.id AND acc.status = 0
            LEFT JOIN company AS com ON app.company = com.id
            LEFT JOIN images AS img ON app.image = img.id
            GROUP BY app.id";
    $result = $conx->query($sql);
    $data = [];

        if ($result->num_rows > 0) {
            while ($i = $result->fetch_assoc()) {

                if($i['appStatus']==0){
                    $status = "Active";
                } else if($i['appStatus']==1){
                    $status = "Pending";
                } else {
                    $status = "Inactive";
                }
                $data[] = array(
                    'id' =>             $i['appID'],
                    'name' =>           $i['appName'],
                    'imageID' =>        $i['appImageID'],
                    'image' =>          $i['appImage'],
                    'company' =>        $i['appCompany'],
                    'details' =>        $i['appDetails'],
                    'status' =>         $status,
                    'accountCount' =>   $i['appCountAccount'],
                );
            }
        }
    echo json_encode($data, true);
 } else {
    echo json_encode("Err");
 }

?>