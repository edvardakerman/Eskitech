import * as dotenv from 'dotenv'
dotenv.config()

const mongoose = require('mongoose');

mongoose.connect(process.env.db_url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connected successfully');
});