<?php

defined('BASEPATH') or exit('No direct script access allowed');

#[\AllowDynamicProperties]
class Home extends CI_Controller
{
    /**
     * Index function that loads the necessary views and helpers for the home page.
     *
     * @return void
     */
    public function index()
    {
        $this->load->view('templates/headerTemplate');
        $this->load->view('templates/navbarTemplate');
        $this->load->view('pages/dashboard');
        $this->load->view('templates/footerTemplate');
        $this->load->helper('url');
    }
}
