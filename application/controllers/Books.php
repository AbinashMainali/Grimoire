<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");

defined('BASEPATH') or exit('No direct script access allowed');

#[\AllowDynamicProperties]
class Books extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Books_Model');
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');
        header('Content-Type: application/json');
    }

    /**
     * Get books where deleted_at is null
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
    public function create_book()
    {
        $data = json_decode(file_get_contents('php://input'), true);
    
        // Validate form inputs
        $this->form_validation->set_data($data);
        $this->form_validation->set_rules('title', 'Title', 'required');
        $this->form_validation->set_rules('first_name', 'First Name', 'required');
        $this->form_validation->set_rules('last_name', 'Last Name', 'required');
        $this->form_validation->set_rules('genre', 'Genre', 'required');
        $this->form_validation->set_rules('published_year', 'Published Year', 'required|exact_length[4]|numeric');
        $this->form_validation->set_rules('description', 'Description', 'min_length[100]');

        if ($this->form_validation->run() == FALSE) {
            echo json_encode(array('status' => 'error', 'message' => validation_errors()));
            exit;
        }

        $data['author'] = $data['first_name'] . ' ' . $data['last_name'];
        $data['created_at'] = $data['updated_at'] = date('Y-m-d H:i:s');

        $bookData = [
            'title' => $data['title'],
            'author' => $data['author'],
            'genre' => $data['genre'],
            'published_year' => $data['published_year'],
            'description' => $data['description'],
            'created_at' => $data['created_at'],
            'updated_at' => $data['updated_at']
        ];

        $id = $this->Books_Model->create_book($bookData);
        echo json_encode(array('status' => 'success', 'data' => $id));
    }

    /**
     * Update book
     * 
     * @param int $id
     * @param array $data
     * @return array
     * 
     */
    public function update_book($id)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        // Validate form inputs
        $this->form_validation->set_data($data);
        $this->form_validation->set_rules('title', 'Title', 'required');
        $this->form_validation->set_rules('first_name', 'First Name', 'required');
        $this->form_validation->set_rules('last_name', 'Last Name', 'required');
        $this->form_validation->set_rules('genre', 'Genre', 'required');
        $this->form_validation->set_rules('published_year', 'Published Year', 'required|exact_length[4]|numeric');
        $this->form_validation->set_rules('description', 'Description', 'min_length[100]');

        if ($this->form_validation->run() == FALSE) {
            echo json_encode(array('status' => 'error', 'message' => $this->form_validation->error_array()));
            exit;
        }

        $data['author'] = $data['first_name'] . ' ' . $data['last_name'];
        
        $updatedData = [
            'title' => $data['title'],
            'author' => $data['author'],
            'genre' => $data['genre'],
            'published_year' => $data['published_year'],
            'description' => $data['description'],
            'updated_at' => date('Y-m-d H:i:s')
        ];

        $updated = $this->Books_Model->update_book($id, $updatedData);
        
        echo json_encode(array('status' => 'success', 'data' => $updated));
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
        echo json_encode(array('status' => 'success', 'data' => $deleted));
    }
}
