'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
const { sequelize } = require('./models');
const path = require('path')
// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

(async () => {
  try {
    
    // Test the connection to the database
    await sequelize.authenticate();
    console.log('Connection to the database was successful');

    // Sync the models
    await sequelize.sync();
    console.log('Models are synchronized with the database');

  }catch(err){
    
    console.log('Connection to the database was unsuccessful' + ' ' + err)

  }
})()


// setup morgan which gives us http request logging
app.use(morgan('dev'));

// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// // parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../client/build')));



// // TODO setup your api routes here
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/courses'));

//setup a friendly greeting for the root route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/build/index.html'));
});

//send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// // setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// start listening on our port
const server = app.listen(8000, () => {
  console.log(`Express server is running on http://localhost:${server.address().port}`);
});
