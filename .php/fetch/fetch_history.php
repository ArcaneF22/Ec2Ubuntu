<?php
    include '../conx.php';
    include '../verify/verify.php';

 if($Verified == "FOUND"){
    if($Got['FOR']=="ALL"){
        $extend = " ";
    } else {
            $extend = " WHERE h.userID = $verifyID ";
    }

    $sql = "SELECT h.id AS historyID,
                h.userID AS userID,
                u.nickname AS userNickname,
                r.name AS userRole,
                img.file AS image,
                pa.path AS path,
                FROM_UNIXTIME(h.datetime, '%M %D, %Y %h:%i:%s') AS dtime,
                h.gadget AS gadget,
                h.timezone AS timezone,
                h.action AS action
        FROM history AS h
        LEFT JOIN users AS u ON u.id = h.userID
        LEFT JOIN default_roles AS r ON r.id = h.userRole
        LEFT JOIN images AS img ON u.avatar = img.id
        LEFT JOIN paths AS pa ON img.type = pa.type".
        $extend
    ." ORDER by h.id DESC ";

    $result = $conx->query($sql);
    $data = [];

        if ($result->num_rows > 0) {
            while ($i = $result->fetch_assoc()) {

                $data[] = array(
                    'id' =>             $i['historyID'],
                    'userID' =>         $i['userID'],
                    'userNickname' =>   $i['userNickname'],
                    'userRole' =>       $i['userRole'],
                    'userImage' =>      $i['path'].$i['image'],
                    'datetime' =>       $i['dtime'],
                    'gadget' =>         $i['gadget'],
                    'timezone' =>       $i['timezone'],
                    'action' =>         $i['action'],
                );
            }
        }
    echo json_encode($data, true);
 } else {
    echo json_encode("Err");
 }

?>