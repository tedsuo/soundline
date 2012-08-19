# Soundline

A simple playlist application for soundcloud.

## Features

- create and store multiple playlists
- add tracks from any sound-related soundcloud url
- edit, update, and delete everything
- ipad-friendly 

# Code Overview

Code consists of two parts: a MVC javascript client application, and a simple node.js server for data storage.  Since this is only a demo app, several shortcuts were taken: 

- *no security-* please enjoy XSSing each other if you can figure out how.
- *no test coverage-* since this app is never actually going to be refactored, I only created tests when I wanted an easy way to work through a problem.  Normally I would aim for much higher test coverage.
- *no compression-* since this is a demo app, I left all of the client files uncompressed so you can have a look at them.  In a real app, everything would be minified and stitched together. 
- *feature incomplete-* there are plenty of fun features I would love to add, but I wanted to respect the time requirement for the coding challenge.  So it only does the basics requested in the challenge documentation.

Besides all that, it works rather well. :)

## Server

### app.js
Simple node.js/mongodb backend.  Serves up the client files, builds the templates, and has RESTful endpoints for the various client-side models.

## Client
Front-end is written using backbone.js, twitter bootstrap, and the SoundCloud javascript SDK.  It follows a "standard" application layout, and namespaces all of it's components under the SL namespace to avoid cluttering up the global namespace.  The app is seperated into the following pieces:

### index.html
The only page of html that is actually loaded.  Basically, it's the build script for the application.

### config.js
Contains all constants used by the application. Since it's always the first thing defined, it also defines the applicaiton namespace.

### boot.js
returns the SL.boot function, to be called once all the components have finished loading.  Initializes the application:

- initializes the SoundCloud connection
- checks to see if the user is logged in or not
- creates the top level models, collections and views

### /models
Backbone models.

### /collections
Backbone collections.

### /views
Backbone views.

### /templates
Javascript template files.  Rendered with _.template, and compiled into javascript on the server with stitchit.

### /helpers
Helper functions used throughout the app.  Each file returns a single function.

### /test
Small set of tests, mostly checking that the server endpoints are connected properly.

### test.html
run said tests.