<?php
require '/home/learnda6/vendor/autoload.php';

use GuzzleHttp\Client;

if(isset($_GET['apikey'])) {
        $apikey = $_GET['apikey'];
} else {
        $apikey = "";
}
if(isset($_GET['company'])) {
        $company = $_GET['company'];
} else {
        $company = "";
}

$reqURL  = 'http://'.$company.'.helpserve.com/api/index.php?e=/Tickets/Ticket/ListAll/12,17,18,19,20,21,23,24,25,29,30/4,5,6,7,8,9/&apikey='.$apikey.'&salt=75996179&signature=f2YHCCJYVzLdGrd9MjPA0CvmHEPyXwAcmkjXk6Sldhs%3D';

$client = new GuzzleHttp\Client();

do{
$res = $client->get($reqURL);

// echo $res->getStatusCode();           // 200
// echo $res->getHeader('content-type'); // 'application/json; charset=utf8'

}while(strpos(substr($res->getBody(), 0, 30), 'ncaught Exception') == true);

echo $res->getBody();
?>
