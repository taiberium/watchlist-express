const Express = require('express');
const bodyParser = require('body-parser');
const securitiesRouter = require('./routes/Securities');


const app = new Express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/securities', securitiesRouter);

const port = 8000;
app.listen(port, () => console.log('App listen port ', port));

