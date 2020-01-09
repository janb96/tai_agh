<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class OneTest extends TestCase
{

    public function testIsOneOne(): void
    {
        $this->assertEquals(
            file_get_contents("http://docker-desktop:5004"),
            1
        );
    }

}