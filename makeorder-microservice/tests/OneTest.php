<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;

// docker run -v $(pwd):/app --rm phpunit/phpunit makeorder-microservice/tests/OneTest.php

final class OneTest extends TestCase
{

    public function testRosol(): void
    {
        $this->assertEquals(
            file_get_contents("http://docker-desktop:5002/products/byProductID/1"),
            '[{"productID":1,"categoryID":1,"productName":"Rosół","productPrice":8,"productStatus":1,"productURL":"rosol.jpg"}]'
        );
    }

    public function testKitchen(): void
    {
        $this->assertEquals(
            file_get_contents("http://docker-desktop:5003/kitchen"),
            '[{"kitchenID":1,"productID":1,"numberOfProducts":1,"productReady":1,"dateOfAdmission":"2020-01-09T22:08:19.279Z","dateOfExecution":null},{"kitchenID":2,"productID":2,"numberOfProducts":1,"productReady":1,"dateOfAdmission":"2020-01-09T23:10:13.862Z","dateOfExecution":null}]'
        );
    }

}