<?php
    $conn = mysqli_connect('127.0.0.1','root','','music');
    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql = "SELECT * FROM music_data WHERE mid=1";
    $result = mysqli_query($conn,$sql);
    if($result){
        $row = mysqli_fetch_assoc($result);
        $data1 = array("image" => $row['image'],
                      "audio" => $row['audio'],
                      "song" => $row['song'],
                      "album" => $row['album'],
                      "singer" => $row['singer'],
                      "duration" => $row['duration'],
                      "isLike" => $row['isLike']);
    };


    $sql = "SELECT * FROM music_data WHERE mid=2";
    $result = mysqli_query($conn,$sql);
    if($result){
        $row = mysqli_fetch_assoc($result);
        $data2 = array("image" => $row['image'],
                      "audio" => $row['audio'],
                      "song" => $row['song'],
                      "album" => $row['album'],
                      "singer" => $row['singer'],
                      "duration" => $row['duration'],
                      "isLike" => $row['isLike']);
    };


    $sql = "SELECT * FROM music_data WHERE mid=3";
    $result = mysqli_query($conn,$sql);
    if($result){
        $row = mysqli_fetch_assoc($result);
        $data3 = array("image" => $row['image'],
                      "audio" => $row['audio'],
                      "song" => $row['song'],
                      "album" => $row['album'],
                      "singer" => $row['singer'],
                      "duration" => $row['duration'],
                      "isLike" => $row['isLike']);
    };

    $dataAll = array($data1,$data2,$data3);

    $callback = $_GET['callback'];
    echo $callback.'('.json_encode($dataAll).')';


?>