<?php
    include '../conx.php';
    include '../verify/verify.php';

if($Verified == "FOUND"){

        if ( $Got['FOR'] == "ALL" ){
                $Extend = " ";
        } else if( $Got['FOR'] == "MY" ){
                $Extend = " WHERE u.id = $verifyID ";
        } else {
                $Extend = " WHERE u.id = 0 ";
        }

    $sql = "SELECT *,
                    r.name AS accountRole,
                    a.accountRole AS accountRoleID,
                    u.nickname AS userNickname,
                    u.role AS userRole,
                    img.file AS avatar,
                    pa.path AS path,
                    app.name AS appName,
                    a.id AS id,
                    a.status AS status
            FROM accounts AS a
            LEFT JOIN users AS u ON a.userID = u.id
            LEFT JOIN default_roles AS r ON a.accountRole = r.id
            LEFT JOIN applications AS app ON a.appID = app.id
            LEFT JOIN images AS img ON u.avatar = img.id
            LEFT JOIN paths AS pa ON img.type = pa.type
            ".$Extend;

    $result = $conx->query($sql);
    $data = [];

        if ($result->num_rows > 0) {
            while ($i = $result->fetch_assoc()) {

                $check_clubs = $conx->query("SELECT COUNT(accountID) as count FROM account_clubs WHERE accountID='".$i['accountID']."' ");
                while ($ii = $check_clubs->fetch_assoc()) {
                    $gotClubsCount = $ii['count'];
                }

                if($i['status']==0){
                    $status = "Active";
                } else if($i['status']==1){
                    $status = "Pending";
                } else {
                    $status = "Inactive";
                }

                $data[] = array(
                    'id' =>                 $i['id'],
                    'accountID' =>          $i['accountID'],
                    'accountNickname' =>    $i['accountNickname'],
                    'accountRole' =>        $i['accountRole'],
                    'accountRoleID' =>        $i['accountRoleID'],
                    'accountClubsCount' =>  $gotClubsCount,
                    'userID' =>             $i['userID'],
                    'userRole' =>             $i['userRole'],
                    'userNickname' =>       $i['userNickname'],
                    'userAvatar' =>         $i['path'].$i['avatar'],
                    'appID' =>              $i['appID'],
                    'appName' =>            $i['appName'],
                    'statusLabel' =>        $status,
                    'status' =>             $i['status'],
                );
            }
        }
    echo json_encode($data, true);
 } else {
    echo json_encode("Err");
 }

?>