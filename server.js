import express from 'express'
import mongoose from 'mongoose'
import logging from './core/logging'
import database from './config/database'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import path from 'path'
import createError from 'http-errors'
import dotenv from 'dotenv'
import http from 'http'
import debug from 'debug'
import indexRouter from './routers'
import user from './routers/user'
import department from './routers/department'

const moduleURL = new URL(import.meta.url);
global.__dirname = path.dirname(moduleURL.pathname.substring(1));


// Setup config
dotenv.config()
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


// --START--    App routers
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
    res.render('error');
});


// Setup server
const port = process.env.PORT || '3000'
app.set('port', port);
var server = http.createServer(app);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);

    console.log(`Server listen on port ${port}`)
}



export default app;