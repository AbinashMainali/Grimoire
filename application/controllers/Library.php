<?php
defined('BASEPATH') OR exit('No direct script access allowed');

#[\AllowDynamicProperties]
class Library extends CI_Controller
{
    public function index()
    {   
        $this->load->view('templates/headerTemplate');
        $this->load->view('templates/navbarTemplate');
        $this->load->view('pages/library');
        $this->load->view('templates/footerTemplate');
    }

    public function addBook(){

        $this->load->view('templates/headerTemplate');
        $this->load->view('templates/navbarTemplate');
        $this->load->view('pages/AddBook');
        $this->load->view('templates/footerTemplate');
    }

    public function editBook(){

        $this->load->view('templates/headerTemplate');
        $this->load->view('templates/navbarTemplate');
        $this->load->view('pages/EditBook');
        $this->load->view('templates/footerTemplate');
    }
}