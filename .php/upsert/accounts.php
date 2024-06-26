<?php
    include '../conx.php';
    include '../verify/verify.php';

 if($Verified == "FOUND"){

    $id =                   $Got['accountID'];
    $accountID =            $Got['accountIDD'];
    $accountRole =          $Got['accountRole'];
    $accountNickname =      $Got['accountNickname'];
    $userID =               $Got['accountuserID'];
    $appID =                $Got['accountappID'];
    $status =               $Got['accountStatus'];

    $insert = "INSERT INTO accounts (`accountID`, `accountRole`, `accountNickname`, `userID`, `appID`, `status`)
                            VALUES ($accountID, $accountRole, '$accountNickname', $userID, $appID, $status) ";

    $check_insert = "SELECT * FROM accounts WHERE `accountID`=$accountID OR (`appID`=$appID AND `accountNickname`='$accountNickname') ";

    $update = "UPDATE accounts
                SET `accountID`         = $accountID,
                    `accountRole`       = $accountRole,
                    `accountNickname`   ='$accountNickname',
                    `userID`            = $userID,
                    `appID`             = $appID,
                    `status`            = $status
                WHERE  `id`             = $id ";

    $check_update = "SELECT * FROM accounts WHERE `accountID`=$accountID AND `id`!=$id ";

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
                    $historyFor         = "ACCOUNT";
                    $historyDetails     = "Account ID: ".$accountID.", Account Role: ".$accountRole.", User ID: ".$userID.", App ID: ".$appID.", Status: ".$status;
                    include './history.php';
                } else {
                    $feedback = "Err Add";
                }

            }

        } catch (Exception $e) {
            $feedback = "Err Catch";
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
                    $historyFor         = "ACCOUNT";
                    $historyDetails     = "Account ID: ".$accountID.", Account Role: ".$accountRole.", User ID: ".$userID.", App ID: ".$appID.", Status: ".$status;
                    include './history.php';
                } else {
                    $feedback = "Err Add";
                }

            }

        } catch (Exception $e) {
            $feedback = "Err Catch";
        }
    }

} else {
    $feedback = "Err";
}

echo json_encode($feedback);
~