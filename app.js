require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
// require database configuration

require('./configs/db.config');

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// make sure express- session is used before the passport
require('./configs/session.config')(app);

require('./configs/passport/passport.config.js')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// Cross-Origin Resource Sharing
app.use(
	cors({
		credentials: true, //this must be setup on frontend side as well.
		// in axios "withCredentials: true"
		// origin: ["http://localhost:3000", "https://appName.herokuapp.com"], --> URLs listed here are granted access to server api's. True means all sites have access. process.env.FRONTEND_POINT instructs system to reference .env file for proper URL. Development versus Production
		origin: [ 'process.env.FRONTEND_POINT' ]
	})
);

// const index = require('./routes/index');
// app.use('/', index);
//      |  |  |
//      |  |  |
//      V  V  V
app.use('/', require('./routes/index.routes'));
app.use('/', require('./routes/recipe.routes'));
app.use('/', require('./routes/recipeBook.routes'));
app.use('/api', require('./routes/authentication.routes'));

module.exports = app;
