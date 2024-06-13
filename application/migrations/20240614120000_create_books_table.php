<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Migration_Create_books_table extends CI_Migration
{
    public function up()
    {
        $this->load->dbforge();
        $this->dbforge->add_field([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'title' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false,
            ],
            'author' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false,
            ],
            'genre' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false,
            ],
            'published_year' => [
                'type' => 'YEAR',
                'null' => false,
            ],
            'description' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'deleted_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);

        $this->dbforge->add_key('id', true);

        $this->dbforge->create_table('books');
    }

    public function down()
    {
        $this->dbforge->drop_table('books');
    }
}