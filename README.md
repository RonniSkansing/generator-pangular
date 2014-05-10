## Generator-pangular

> Experimenting with yeoman generator to see if it can help a in a fast prototyping process.


## How to use

1. npm install pangular 
2. yo pangular && composer install && grunt serve
3. Visit 127.0.0.1:8080

## Setup so far
- Frontend
  - Folder by feature
  - Bits of HTML5Boilerplate
  - Angular
  - Less
  - Html5shim / json3
  - Api folder for backend access.

- Backend
  - Folder by Feature
  - Composer and autoload (psr-4)
  - phpunit

- grunt
  - Waches files and does approriate things
  - Autoreload with php on needed resources.
  - JsHint and auto include
  - less compilation then prefixed and auto included
  - php server with livereload

  ## What is missing?
  - generator tests and test tools
  - More yo stuff
  - Angular test, grunt setup for running test and test tools
  - PHPUnit configuration for folder by feature
  - PHP lint files on save
  - Running PHP test suit on approriate times
  - E2E test tools
  - The entire build process
  - Simple matching .htaccess file for webroot and api
  - favicon
  - A better way to include livereload
  - CSS reset sheet
  - Proper attribution to projects used
  - Lots more.


Feel free to PR or whatever you feel like
