whatup-website
==============

Web client for Project WhatUp.

Instructions
-------------

The main index.php file is not being tracked. All this file does is set the environment variable to development or production. This value will be different on our staging and prod servers.

Any config files that need special values on the production server should be copied to application/config/production and prod values should be set in this copy of the file. Config files not present in the production folder for the prod server default to the counterpart production file in application/config. 
Basically, config files in application/config/production override the config files in application/config for the PRODUCTION environment.

No changes should ever be made to any file in the system/ directory. Leaving that directory untouched makes it easy to update CI when new versions are released. Changes required in any file in the system/ directory should be made by extending that file in the application/ directory so that changes persist after updating.

All controllers should extend MY_Controller and models should extend MY_Model. Neither of these should extend CI's CI_Controller or CI_Model classes. This makes the app easily extensible at a later stage.

Deployments to production server are automatic when pushes are made to master branch.
