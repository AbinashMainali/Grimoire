<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Books_Model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();

        $this->load->database();
    }

    /**
     * Get books
     * 
     * @return array
     *
     **/
    public function get_books()
    {
        $query = $this->db->get('books');
        return $query->result();
    }

    /**
     * Get book
     * 
     * @param int $id
     * @return object
     *
     **/
    public function get_book($id)
    {
        $query = $this->db->get_where('books', array('id' => $id));
        return $query->row();
    }

    /**
     * Create book
     * 
     * @param array $data
     * @return int
     *
     **/
    public function create_book($data)
    {
        $this->db->insert('books', $data);
        return $this->db->insert_id();
    }

    /**
     * Update book
     * 
     * @param int $id
     * @param array $data
     * @return int
     *
     **/
    public function update_book($id, $data)
    {
        $this->db->where('id', $id);
        $this->db->update('books', $data);
        return $this->db->affected_rows();
    }

    /**
     * Delete book
     * 
     * @param int $id
     * @return int
     *
     **/
    public function delete_book($id)
    {
        $this->db->where('id', $id);
        $this->db->delete('books');
        return $this->db->affected_rows();
    }
}