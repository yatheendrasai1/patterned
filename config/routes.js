'use strict';

/**
 * Module dependencies.
 */

const home = require('../app/controllers/home');

/**
 * Expose
 */

module.exports = function(app) {
  app.get('/', home.homepage);
  app.get("/notes",home.notes);
  app.get("/register", home.register);
  app.post("/registerUser",home.registerUser);
  app.get("/login", home.login);
  app.post("/login", home.loginUser);
  app.get("/users", home.getUsers);
  app.get("/loadNotification", home.loadNotification);
  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf('not found') ||
        ~err.message.indexOf('Cast to ObjectId failed'))
    ) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
