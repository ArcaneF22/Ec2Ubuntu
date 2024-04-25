<?php
    include '../conx.php';
    include '../verify/verify.php';

 if($Verified == "FOUND"){

    $id =               $Got['id'];
    $clubID =           $Got['clubID'];
    $downlineID =       $Got['downlineID'];
    $uplineID =         $Got['uplineID'];
    $percentage =       $Got['percentage'];
    $status =           $Got['status'];

    $dateTime =         new DateTime('now', new DateTimeZone('UTC'));
    $stated =           $dateTime->getTimestamp();

    $sql_roles = "SELECT COALESCE((SELECT r.id FROM default_roles AS r 
                                        LEFT JOIN accounts AS a ON r.id = a.accountRole 
                                        WHERE a.accountID=$downlineID),0) AS downlineRole,
                         COALESCE((SELECT r.id FROM default_roles AS r 
                                        LEFT JOIN accounts AS a ON r.id = a.accountRole 
                                        WHERE a.accountID=$uplineID),0) AS uplineRole
                         FROM uplines AS up";

    $get_roles = $conx->query($sql_roles);
    while ($j = $get_roles->fetch_assoc()) {
        $downlineRole =         $j['downlineRole'];
        $uplineRole =           $j['uplineRole'];
    }

    $check_insert = "SELECT * FROM uplines 
                        WHERE `clubID`=$clubID 
                            AND `downlineID`=$downlineID
                            AND `uplineID`=$uplineID
                            AND ( `status`=0 OR `status`=1 ) ";

    $insert = "INSERT INTO uplines (`clubID`, `downlineID`, `downlineRole`, `uplineID`, `uplineRole`, `percentage`, `status`, `stated`)
                VALUES ($clubID, $downlineID, $downlineRole, $uplineID, $uplineRole, $percentage, $status, $stated) ";

    $check_update = "SELECT * FROM uplines WHERE (`name`='$name' OR `idd`=$idd) AND `id`!=$id ";

    $update = "UPDATE `uplines`
                SET `clubID`=$clubID, 
                    `downlineID`='$downlineID', 
                    `downlineRole`=$downlineRole, 
                    `uplineID`=$uplineID, 
                    `uplineRole`='$uplineRole', 
                    `percentage`='$percentage', 
                    `status`=$status, 
                    `stated`=$stated
                WHERE  `id`=$id";
                
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
                        $historyFor         = "UPLINE";
                        $historyDetails     = "Downline ID: ".$downlineID.", Upline ID: ".$downlineID.", Percent: ".$percentage.", Status: ".$status;
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
                        $historyFor         = "UPLINE";
                        $historyDetails     = "Downline ID: ".$downlineID.", Upline ID: ".$downlineID.", Percent: ".$percentage.", Status: ".$status;
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
