# angular-starter
Full initialized front-end project based on angularJS framework

# Architecture

```
assets\
  |
  |-- js\
  |   |
  |   |-- main.js         // script for public application
  |   |-- main-dev.js     // script for development application
  |   |-- directives.js   // common directives for the whole application
  |   |-- jquery.min.js
  |   |-- angular\
  |   |   |
  |   |   |-- angular.min.js
  |   |   |-- angular-route.min.js
  |   |   |-- ...
  |
  |-- templates\          // html templates with ng tags
  |   |
  |   |-- entity\         // items (independant blocks like people, posts, products, ...)
  |   |-- lightbox\       // lightboxes, popups, ...
  |   |-- page\           // body less header, footer, ...
  |
index.php         // root for the public application
  |
dev.php           // root for the development application
  |
.htaccess         // redirects urls to index.php (default) or dev.php (for /develop url)
```

# Demo
http://angular-starter.duwab.com/
