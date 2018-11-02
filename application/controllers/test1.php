<?php
include 'Accountcontroller.php';
class test1 extends TestCase{
    // public function test_test()
    // {
    //     $output=$this->request('POST',['simransande.a@gmail.com','login']);
    //     $expected='simransande.a@gmail.com';
    //     $this->assertContains($expected,$output);
    // }
    public function test()
    {
        $this->unit->run(login('simransande.a@gmail.com','simransande.a@gmail.com'),"testing sum function");
        // $this->unit->run(multiply(4,5),20,"testing multiply function");

        $this->load->view('tests');
    }
}