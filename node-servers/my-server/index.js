var express = require('express');
var hash = require('pbkdf2-password')()
var path = require('path');
var session = require('express-session');

var app = module.exports = express();


// Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: false}));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'very secret'
}));

// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});


// Dummy DB
var users = {
  anha: { name: "anha"},
  andreas: { name: "andreas"}
};


function hash({ password: 'foobar' }, function(err, pass, salt, hash, user) {
  if (err) throw err;
  users.user.salt = salt;
  users.user.hash = hash;
});


// Authenticate using our plain-object database of doom!

function authenticate(name, pass, fn ) {
  if (!module.parent) console.log('authenticateing %s:%s', name, pass);
  var user = users[name];
  if (!user) return fn(new Error('Cannot find user'));
  hash({ password: pass, salt: user.salt }, function(err, pass, salt, hash, name) {
    if (err) return fn(err);
    if (hash == user.hash) return fn(null, user);
    fn( new Error('invalid password'));
  });
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  }
  else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

app.get('/', function(req, res, next) {
  res.redirect('/login');
});

app.get('/restricted', restrict, function(req, res) {
  res.render('restricted');
});

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/');
  });
});

app.get('/login', function(req, res, next) {
  res.render('login');
});

app.post('/login', function(req, res) {
  authenticate(req.body.username, req.body.password, function(err, user) {
    if (user) {
      req.session.regenerate(function() {
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name;
        res.redirect('/restricted');
      });
    }
    else {
      req.session.error = 'Authentication failed';
      res.redirect('/login');
    }
  });
});

app.listen(1337, function() {
  console.log("Server running on port 1337");
});
