<?php
    include '../conx.php';
    include '../verify/verify.php';

 if($Verified == "FOUND"){
    $id =               $Got['clubID'];
    $idd =              $Got['clubIDD'];
    $name =             $Got['clubName'];
    $image =            $Got['clubImage'];
    $appID =            $Got['clubApp'];
    $details =          $Got['clubDetails'];
    $type =             $Got['clubType'];
    $union =            $Got['clubUnion'];
    $status =           $Got['clubStatus'];

    $insert = "INSERT INTO clubs (`idd`, `name`, `image`, `appID`, `details`, `type`, `union`)
                            VALUES ($idd, '$name', $image, $appID, '$details', '$type', $union) ";
    $check_insert = "SELECT * FROM clubs WHERE `name`='$name' OR `idd`=$idd OR `id`=$id ";

    $update = "UPDATE `clubs`
                SET `idd`=$idd, `name`='$name', `image`=$image, `appID`=$appID, `details`='$details', `type`='$type', `union`=$union, `status`=$status
                WHERE  `id`=$id";
    $check_update = "SELECT * FROM clubs WHERE (`name`='$name' OR `idd`=$idd) AND `id`!=$id ";

    if(empty($id) || $id == 0){
        //IF NO ID THEN INSERT
        try {
            $duplicate_insert = $conx->query($check_insert);

            if ($duplicate_insert->num_rows > 0) {
                    while ($i = $duplicate_insert->fetch_assoc()) {
                            $gotID = $i["id"];
                    }
                $feedback = "Duplicate: ".$gotID;
            } else {

                if ($conx->query($insert) === TRUE) {
                        $feedback = "Added";
                        $historyAction      = "ADDED";
                        $historyFor         = "CLUB";
                        $historyDetails     = "ID: ".$idd.", Name: ".$name.", Application ID: ".$appID.", Status: ".$status;
                        include './history.php';
                } else {
                    $feedback = "Err Add";
                }

            }
        } catch (Exception $e) {
            $feedback = "Err";
        }
    } else {
        //IF WITH ID THEN UPDATE
        try {
            $duplicate_update = $conx->query($check_update);

            if ($duplicate_update->num_rows > 0) {
                    while ($i = $duplicate_update->fetch_assoc()) {
                            $gotID = $i["id"];
                    }
                $feedback = "Duplicate: ".$gotID;
            } else {

                if ($conx->query($update) === TRUE) {
                        $feedback = "Updated";
                        $historyAction      = "UPDATED";
                        $historyFor         = "CLUB";
                        $historyDetails     = "ID: ".$idd.", Name: ".$name.", Application ID: ".$appID.", Status: ".$status;
                        include './history.php';
                } else {
                    $feedback = "Err Add";
                }

            }
        } catch (Exception $e) {
            $feedback = "Err";
        }
    }
} else {
    $feedback = "Err";
}

echo json_encode($feedback);
~