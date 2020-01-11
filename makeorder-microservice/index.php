<?php

session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: token, Content-Type');
header('Access-Control-Max-Age: 1728000');
header('Content-Length: 0');
header('Content-Type: text/plain');

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$body_from_post = file_get_contents('php://input');
$body = json_decode($body_from_post);

$current = file_get_contents("licznik.txt");
$current = intval($current) + 1;
file_put_contents("licznik.txt", $current);

$fileName = "rachunek-".$current.".json";

file_put_contents($fileName, $body_from_post);


?>