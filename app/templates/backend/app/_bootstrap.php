<?php
// configuration

// autoload
require __DIR__ . '/../vendor/autoload.php';

// setup ioc

// load framework or whatever
$application = new <%= appName %>\Example();

//  boot application
$application->run();