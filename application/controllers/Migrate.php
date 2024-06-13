<?php
defined('BASEPATH') OR exit('No direct script access allowed');

#[AllowDynamicProperties]
class Migrate extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->library('migration');
    }

    public function index()
    {
        // Handle running migrations here
        if ($this->migration->current() === FALSE)
        {
            show_error($this->migration->error_string());
        }
        else
        {
            echo "Migrations ran successfully!";
        }
    }

    public function version($version)
    {
        // Handle migrating to a specific version
        if ($this->migration->version($version) === FALSE)
        {
            show_error($this->migration->error_string());
        }
        else
        {
            echo "Migrated to version " . $version;
        }
    }

    public function latest()
    {
        // Handle migrating to the latest version
        if ($this->migration->latest() === FALSE)
        {
            show_error($this->migration->error_string());
        }
        else
        {
            echo "Migrated to latest version";
        }
    }
}
?>
