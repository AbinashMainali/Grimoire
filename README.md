# Grimoire
 Grimoire is a simple book library app wrapped with mystical and magical web theme developed using VUE 2 for Frontend and CodeIgniter for Backend.
 This is on page vue app which means vue is integrated only on certain features/pages. 

# Technologies
-Backend: Code Igniter 3.1.13 (PHP)
-Frontend: Vue 2 (Javascript)
-Database: MySQL
-Styling: Basic CSS & Bootstrap

# Installation

# Frontend: Vue 2

-Use direct VUE CDN script

"https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.js"

-Bootstrap 
"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"

# Backend: CodeIgniter

PHP version 8.2.4 used.

# Run Server
- php -S localhost:8000 index.php

# Note:
 Since I am using PHP Version 8.2 and codeIgniter 3 was developed before that, I had so system/core and system/database file changes to avoid error such as
# Message: Creation of dynamic property CI_Loader::$hooks is deprecated

PHP 8.2 introduces a new attribute in the global namespace named             #[AllowDynamicProperties]. Classes declared with this attribute signals PHP to not emit any deprecation notices when setting dynamic properties on objects of that class.

Well this solved my error issue. 

# DataBase Creation

For Database, I am using XAMMP, MYSQL. So make sure your XAMPP or MYSQL database is running.

Run migrations using php index.php migrate

# Note
Configure your database.php file accordignly. 

In my case, Database name is set as grimoire. 

Run Migration
php index.php migrate

if u want to run specific migration version 

php index.php migrate version(your_migration_file_timestamp)

or latest version

php index.php migrate/latest











