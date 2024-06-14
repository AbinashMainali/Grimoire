<?php
defined('BASEPATH') or exit('No direct script access allowed');

#[\AllowDynamicProperties]
class Library extends CI_Controller
{
    /**
     * Load the views for the library index page.
     *
     * This function loads the necessary views to display the library index page. It includes the header, navbar,
     * library page, and footer templates.
     *
     * @return void
     */
    public function index()
    {
        $this->load->view('templates/headerTemplate');
        $this->load->view('templates/navbarTemplate');
        $this->load->view('pages/library');
        $this->load->view('templates/footerTemplate');
    }

    /**
     * Load the views for adding a book.
     *
     * This function loads the necessary views to add a book. It includes the header, navbar,
     * AddBook page, and footer templates.
     *
     * @return void
     */
    public function addBook()
    {

        $this->load->view('templates/headerTemplate');
        $this->load->view('templates/navbarTemplate');
        $this->load->view('pages/AddBook');
        $this->load->view('templates/footerTemplate');
    }

    /**
     * Load the views for editing a book.
     *
     * This function loads the necessary views to edit a book. It includes the header, navbar,
     * EditBook page, and footer templates.
     *
     * @return void
     */
    public function editBook()
    {

        $this->load->view('templates/headerTemplate');
        $this->load->view('templates/navbarTemplate');
        $this->load->view('pages/EditBook');
        $this->load->view('templates/footerTemplate');
    }
}
