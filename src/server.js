import Hapi from '@hapi/hapi'
import routes from './routes'
import db from './database'
import * as admin from 'firebase-admin';
import credentials from '../credentials.json'
import dotenv from 'dotenv';
import inert from '@hapi/inert'

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
let server;
const start = async() => {
     server = Hapi.server({
        port: PORT,
        host: '0.0.0.0',
    })
    await server.register(inert);

    routes.forEach(route => server.route(route));
    db.connect();
    await server.start();
    console.log(`Server is listening on ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
})

process.on('SIGINT', async () => {
    console.log('Stopping Server...');
    await server.stop({timeout: 10000});
    db.end();
    console.log('Server Stopped');
    process.exit(0);
})

start();