# InfoNaytto
Labin infonaytto

# Installation
* Install node.js and NPM if not already installed. Instructions e.g. here: https://learn.adafruit.com/node-embedded-development?view=all#installing-node-dot-js
* Clone all the files to a directory and run "NPM install" to install all the dependencies.
* Add scripts from scripts.txt to crontab to be run e.g. every 30 seconds. Remember to change the paths to point to your public directory.
* Optionally configure node.js to be run as a service. I have used Forever (https://github.com/foreverjs/forever) for that and there is a default service configuration file named node_service in here for that.

If you want to test and debug remotely, change the IP addresses in the main.js to point to the remote server.

# External libraries
https://fullcalendar.io/
https://css-tricks.com/css3-clock/
