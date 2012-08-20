# Soundline

A simple playlist application for soundcloud. Check it out at http://soundline.tedsuo.com

## Features

- create and store multiple playlists
- add tracks from any sound-related soundcloud url
- edit, update, and delete everything
- mobile-friendly 

# Code Overview

Code consists of two parts: a MVC javascript client application, and a simple node.js server for data storage.  Since this is only a demo app, several shortcuts were taken: 

- _no security_ please enjoy XSSing each other if you can figure out how.
- _no test coverage_ since this app is never actually going to be refactored, I only created tests when I wanted an easy way to work through a problem.  Normally I would aim for much higher test coverage.
- _no compression_ I left all of the client files uncompressed so you can have a look at them.  In a real app, everything would be minified and stitched together. 
- _feature incomplete_ there are plenty of fun features I would love to add, but I wanted to respect the time requirement for the coding challenge (and have a vacation).  So it only does the basics requested in the challenge documentation.  Happy to witeboard any of the bonus features.  Also it loads a max of 50 items per url, dodging the bullet with your 40,000+ Abelton Live group.
- _IE can die_ I didn't even bother to check.

Besides all that, it works rather well. :)

## Server

### app.js
Simple node.js/mongoDB backend.  Serves up the client files, builds the templates, and has RESTful endpoints for the various client-side models.  All id's are created on the client-side, no session storage or security.

## Client
Front-end is written using backbone.js, twitter bootstrap, and the SoundCloud javascript SDK.  It follows a "standard" application layout, and namespaces all of it's components under the SL namespace to avoid cluttering up the global namespace.  The app is seperated into the following pieces:

### index.html
The only page of html that is actually loaded.  Basically, it's the build script for the application.

### config.js
Contains all constants used by the application. Since it's always the first thing defined, it also defines the application namespace.

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
Javascript template files.  Rendered with _.template, and compiled into javascript on the server with stitchit.  Templates are accessed like thus:

```javascript
SL.t.template_file_name( params );
```

### /helpers
Helper functions used throughout the app.  Each file returns a single function.

### /test
Small set of tests, mostly checking that the server endpoints are connected properly.

### test.html
run said tests.