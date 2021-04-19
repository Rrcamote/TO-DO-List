
<?php 
$task = $_POST['tasks'];
if($task != ""){
    $datahandler = fopen("tasks.txt", "a+");
    fwrite($datahandler, $task . "\n");
}
$taskarray = [];
while(! feof($datahandler)){
    $lines = fgets($datahandler);
    array_push($taskarray,$lines);
    
}
fclose($datahandler);
echo json_encode(array("tasks" => $taskarray));
?>