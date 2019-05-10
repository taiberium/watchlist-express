var Express = require('express');
var bodyParser = require('body-parser');
var securitiesRouter = require('./routes/securities');


var app = new Express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/securities', securitiesRouter);

var port = 3000;
app.listen(port, function () {
    console.log('App listen port ', port)
});
