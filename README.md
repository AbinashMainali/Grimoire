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

Use direct CDN script on index.html

"https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.js"

# Backend: CodeIgniter

-Must run Apache or Nginx server (In my case, I am using Apache).
PHP version 8.2.4 used.

-Clone the repo into XAMPP/htdocs inorder to run in the server. 

# Note:
 Since I am using PHP Version 8.2 and codeIgniter 3 was developed before that, I had so system/core and system/database file changes to avoid error such as
# Message: Creation of dynamic property CI_Loader::$hooks is deprecated

PHP 8.2 introduces a new attribute in the global namespace named             #[AllowDynamicProperties]. Classes declared with this attribute signals PHP to not emit any deprecation notices when setting dynamic properties on objects of that class.

Well this solved my error issue. 

# DataBase Creation

Database name is set as grimoire. 

CREATE TABLE BOOK (
    id INT AUTO_INCREMENT PRIMARYKEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    published_year YEAR NOT NULL,
    description TEXT
);




