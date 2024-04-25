<?php
    include '../conx.php';
    include '../verify/verify.php';

    if($Verified == "FOUND"){

         $sql = "SELECT c.id AS clubID,
                    c.idd AS clubIDD,
                    c.name AS clubName,
                    img.file AS clubImage,
                    c.image AS imageID,
                    c.details AS clubDetails,
                    c.type AS clubType,
                    c.union AS clubUnion,
                    uni.name AS unionName,
                    uni.logo AS unionImage,
                    c.status AS clubStatus,
                    app.name AS appName,
                    c.appID AS appID,
                    pa.path AS path
            FROM clubs AS c
            LEFT JOIN applications AS app ON c.appID = app.id
            LEFT JOIN unions AS uni ON c.union=uni.id
            LEFT JOIN images AS img ON c.image = img.id
            LEFT JOIN paths AS pa ON img.type = pa.type";
    $result = $conx->query($sql);
    $data = [];

        if ($result->num_rows > 0) {
            while ($i = $result->fetch_assoc()) {

                $check_role = $conx->query("SELECT count(accountID) as accountCount FROM account_clubs WHERE clubID='".$i['clubID']."' AND status = 0");
                while ($ii = $check_role->fetch_assoc()) {
                    $gotClubUsers = $ii['accountCount'];
                }

                if($i['status']==0){
                    $status = "Active";
                } else if($i['status']==1){
                    $status = "Pending";
                } else {
                    $status = "Inactive";
                }

                $data[] = array(
                    'id'                => $i['clubID'],
                    'idd'               => $i['clubIDD'],
                    'name'              => $i['clubName'],
                    'imageID'           => $i['imageID'],
                    'imageFull'         => $i['path'].$i['clubImage'],
                    'details'           => $i['clubDetails'],
                    'type'              => $i['clubType'],
                    'unionID'           => $i['clubUnion'],
                    'unionName'         => $i['unionName'],
                    'unionImage'        => $i['unionImage'],
                    'users'             => $gotClubUsers,
                    'appID'             => $i['appID'],
                    'appName'           => $i['appName'],
                    'statusLabel'       => $status,
                    'status'            => $i['status'],
                );
            }
        }
    echo json_encode($data, true);
 } else {
    echo json_encode("Err");
 }

?>