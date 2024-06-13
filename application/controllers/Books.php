<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");

defined('BASEPATH') OR exit('No direct script access allowed');

#[\AllowDynamicProperties]
class Books extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Books_Model');
        $this->load->helper('url');
    }

    /**
     * Get all books
     * 
     * @return array
     * 
     */
    public function index()
    {
       $books = $this->Books_Model->get_books();
       echo json_encode($books);
    }

    /**
     * Get book by id
     * 
     * @param int $id
     * @return array
     * 
     */
    public function get_book($id)
    {
        $book = $this->Books_Model->get_book($id);
        echo json_encode($book);
    }

    /**
     * Create new book
     * 
     * @param array $data
     * @return array
     * 
     */
    public function create_book($data)
    {
        $id = $this->Books_Model->create_book($data);
        echo json_encode(array('status'=> 'success', 'data'=> $id));
    }

    /**
     * Update book
     * 
     * @param int $id
     * @param array $data
     * @return array
     * 
     */
    public function update_book($id, $data)
    {
        $updated = $this->Books_Model->update_book($id, $data);
        echo json_encode(array('status'=> 'success', 'data'=> $updated));
    }

    /**
     * Delete book
     * 
     * @param int $id
     * @return array
     * 
     */
    public function delete_book($id)
    {
        $deleted = $this->Books_Model->delete_book($id);
        echo json_encode($deleted);
    }
}

