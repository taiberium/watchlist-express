const createError = require('http-errors');
const Express = require('express');
const bodyParser = require('body-parser');
const securitiesRouter = require('./routes/Securities');
const path = require('path');


const app = new Express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/securities', securitiesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = err;

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const port = 8000;
app.listen(port, () => console.log('App listen port ', port));

