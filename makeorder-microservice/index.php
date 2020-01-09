<?php

print_r("Hej");
$result = file_get_contents("http://docker-desktop:5003/kitchen");
print_r($result);

?>