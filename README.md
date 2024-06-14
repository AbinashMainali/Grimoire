# Grimoire
 Grimoire is a simple book library app wrapped with mystical and magical web theme developed using VUE 2 for Frontend and CodeIgniter for Backend.
 This is on page vue app which means vue is integrated only on certain features/pages. 

	

https://github.com/AbinashMainali/Grimoire/assets/27627798/5324c00a-2a18-4ff8-9fc0-58be8a06994e



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
- I am running server through XAMPP Apache server for that I have positioned my project directory inside the xampp/htdocs folder. 
Hence my server run in
localhost/grimoire

The best way to run server is to clone project inside the xampp/htdocs to avoid config file changes. 

# Note:
 Since I am using PHP Version 8.2 and codeIgniter 3 was developed before that, I had so system/core and system/database file changes to avoid error such as
# Message: 
Creation of dynamic property CI_Loader::$hooks is deprecated

PHP 8.2 introduces a new attribute in the global namespace named #[AllowDynamicProperties]. Classes declared with this attribute signals PHP to not emit any deprecation notices when setting dynamic properties on objects of that class.

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


# Challenges Faced:

Challenge 1: Setting up Code Igniter
Since, XAMPP, PHP, and APACHE server needed for this project was already installed my computer. However, I need to set up CodeIgniter which wasn't hard at first. 
But upon running server, I faced difficulties due to unfamiliar error "Creation of dynamic property CI_Loader::$hooks is deprecated" which upon research was found
that my PHP version is above 8.2 and some of the code igniter function were depreciated. After tons of stackoverflow and reddit search and trial and error was able to
resolve this issue by adding global namespace named #[AllowDynamicProperties] which made PHP to not emit any deprecation notices when setting dynamic properties on objects of that class.

Challenge 2: Setting Up Migration
I am familiar with Laravel PHP, so I thought I could do it easily but since codeigniter doesn't have inbuilt migration controller, I had to solve the issue of migration by
building my own migrate controller which indeed work smoothly. 

Challenge 3: Mime Type error
This was the most complicated issue. Earlier, I setup my project use Localhost:8000 without placing it into xampp/docs in order to avoid using apache server and instead use the
php -s localhost:8000 index.php. But after several attempt I couldn't avoid this error and surrender myself to move my project to xampp/htdocs which avoided the mime type error. 
Well I did have to reconfigure some elements such as rewriting .htaccess and config base_url and so on. 

Challenge 4: Setting front end view
Since, the requirement was to made it on page vue and not a SPA, I had trouble arranging the file structure i.e PHP, JS, Vue component and other assets co-exist or align in order. Since, I used CDN script for vue instead of package manager, it was quite confusing on how elements get imported and rendered in different pages. Honestly, at first, I was making the component SPA without any web route just with switching and toggling components on event action. Later upon watching some tutorials and example project, I was able to grasp the idea of how I can structure the PHP views into templates and pages to load it as necessary. Even the slightest miss placement of the script file in the HTML file could be a 
headache sometime.

Challenge 5: Understanding Vue binds
I did understand on how to use vue binds on html tag but I still need practise to make it much more effective.










