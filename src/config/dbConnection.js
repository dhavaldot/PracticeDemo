import { set, connect, connection } from 'mongoose';

const DATABASE_NAME = process.env.DATABASE_NAME;
const CONNECTION_URL = process.env.CONNECTION_URL + DATABASE_NAME;

//set('useCreateIndex', true);
//set('useFindAndModify', false);

connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = connection;

db.on('error', () => {
    console.error('Error occured in db connection');
});

db.on('open', () => {
    console.log(`DB Connection with ${DATABASE_NAME} established successfully`);
});
