<?php


use PHPUnit\Framework\TestCase;

class FirstTest extends TestCase

{

    public function testMultiplication()
    {
        $a=5;
        $b=3;
        $c=5*3;
        $this->assertEquals($c,15);
    }
}
