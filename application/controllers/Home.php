<?php

defined('BASEPATH') OR exit('No direct script access allowed');

#[\AllowDynamicProperties]
class Home extends CI_Controller
{
    public function index()
    {
        $this->load->view('home');
        $this->load->helper('url');
    }
}
