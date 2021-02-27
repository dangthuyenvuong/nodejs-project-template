import dotenv from 'dotenv'
dotenv.config()

let MONGO_USERNAME
let MONGO_PASSWORD
let MONGO_HOST
let SERVER_HOSTNAME
let SERVER_PORT
let DATABASE_NAME
let MONGO_STRING_CONNECT

if (process.env.ENVIRONMENT === 'prod') {

    MONGO_USERNAME = process.env.MONGO_USERNAME || 'root'
    MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''
    MONGO_HOST = process.env.MONGO_URL || 'localhost'



    SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
    SERVER_PORT = process.env.SERVER_PORT || 27017
    DATABASE_NAME = process.env.MONGO_DATABASE || 'test'
    MONGO_STRING_CONNECT = process.env.MONGO_STRING_CONNECT || ''




} else {
    MONGO_USERNAME = process.env.MONGO_USERNAME_TEST || 'root'
    MONGO_PASSWORD = process.env.MONGO_PASSWORD_TEST || ''
    MONGO_HOST = process.env.MONGO_URL_TEST || 'localhost'



    SERVER_HOSTNAME = process.env.SERVER_HOSTNAME_TEST || 'localhost'
    SERVER_PORT = process.env.SERVER_PORT_TEST || 27017
    DATABASE_NAME = process.env.MONGO_DATABASE_TEST || 'test'
    MONGO_STRING_CONNECT = process.env.MONGO_STRING_CONNECT_TEST || ''

}

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    dbName: DATABASE_NAME
}


const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: MONGO_STRING_CONNECT,
    dbName: DATABASE_NAME
}

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const database = {
    mongo: MONGO,
    server: SERVER
}

export default database