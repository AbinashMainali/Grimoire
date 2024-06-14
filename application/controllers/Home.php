<?php

defined('BASEPATH') OR exit('No direct script access allowed');

#[\AllowDynamicProperties]
class Home extends CI_Controller
{
    public function index()
    {
        $this->load->view('templates/headerTemplate');
        $this->load->view('templates/navbarTemplate');
        $this->load->view('pages/dashboard');
        $this->load->view('templates/footerTemplate');
        $this->load->helper('url');
    }
}
