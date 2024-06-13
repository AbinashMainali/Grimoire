<?php
defined('BASEPATH') OR exit('No direct script access allowed');
#[\AllowDynamicProperties]
class Authors extends CI_Controller
{
    public function index()
    {   
        $this->load->view('templates/headerTemplate');
        $this->load->view('templates/navbarTemplate');
        $this->load->view('pages/authors');
        $this->load->view('templates/footerTemplate');
    }
}

