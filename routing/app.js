var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let data = { count: 0, msgs: [] };

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Page',
        pageName: 'Demo'
    });
});

app.get('/buttons', (req, res) => {
  res.render('buttons');
});

app.get('/recipesinput', (req, res) => {
    res.render('recipesinput');
  });


app.get('/recipesresult', async (req, res) => {
    const ingredient = req.query.recipe;
  
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`);
      const data = await response.json();
  
      // Pass meals (array of results) and original ingredient to EJS
      res.render('recipesresult', { meals: data.meals, ingredient });
    } catch (err) {
      console.error(err);
      res.send("Error fetching recipes.");
    }
  });

app.get('/distance', (req, res) => {
    res.render('distance');
});

app.get('/data', (req, res) => {
    res.json(data);
});

app.get('/update', (req, res) => {
    data.count += 1;
    res.json(data);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
