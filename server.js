import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import ip from 'ip';
require('dotenv').config({ path: '.env' });

const server = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

require('./src/config/dbConnection');

server.use(urlencoded({ extended: true }));
server.use(json());

//Enable the CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET, PUT, POST, DELETE, OPTIONS'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept'
    );
    next();
});
server.use(cors());

server.all('*', (req, res, next) => {
    let { method, path } = req;
    //if (!path.includes('api-docs'))
    console.log(`${method.toUpperCase()} => ${path}`);
    next();
});

//import routes
import { userRoute } from './src/routes';
import { INTERNAL_LINKS } from './src/enum';

server.get('/', function (req, res) {
    res.json({ message: 'Welcome to RESTFul API!' });
});

server.use(INTERNAL_LINKS.USERS, userRoute);

server.listen(PORT, () => {
    console.log(`API Runing at
    Localhost: http://${HOST}:${PORT}/
    LAN:http://${ip.address()}:${PORT}/`);
});
