import express from 'express'
import mongoose from 'mongoose'
import logging from './core/logging'
import database from './config/database'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import path from 'path'
import createError from 'http-errors'


// api version 
import routerV1 from './resources/v1/routers'
import routerV2 from './resources/v2/routers'

import indexRouter from './routers'
import user from './routers/user'
import department from './routers/department'
import apiversion from './core/apiversion'
import fileUpload from 'express-fileupload'

// const moduleURL = new URL(import.meta.url);
// global.__dirname = path.dirname(moduleURL.pathname.substring(1));


// Setup config
const NAMESPACE = 'Server'

// Setup connect mongodb
mongoose.connect(database.mongo.url, database.mongo.options)
    .then(result => logging.info(NAMESPACE, 'Connected to MongoDB!'))
    .catch(error => logging.error(NAMESPACE, error.message, error))


// Setup express
let app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');


// logger morgan
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Use cookie
app.use(cookieParser())
// setup folder contain assets
app.use(express.static((path.join(__dirname, 'public'))))

// upload file
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// --START--    App routers
apiversion(app, {
    v1: routerV1,
    v2: routerV2
})
app.use('/', indexRouter)
app.use('/', user)
app.use('/department', department)


// --END--      App routers

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error')
    res.json({ error: err })
});


// Setup server
const port = process.env.PORT || '3000'
app.set('port', port);

export default app;
