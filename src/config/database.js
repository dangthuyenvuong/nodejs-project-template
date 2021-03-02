let MONGO_USERNAME = process.env.MONGO_USERNAME || 'root'
let MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''
let MONGO_HOST = process.env.MONGO_URL || 'localhost'

let SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
let SERVER_PORT = process.env.SERVER_PORT || 27017
let DATABASE_NAME = process.env.MONGO_DATABASE || 'test'
let MONGO_STRING_CONNECT = process.env.MONGO_STRING_CONNECT || ''


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