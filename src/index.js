require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const morgan = require('morgan');
const { MONGO_URI } = require('./env');

const PORT = process.env.PORT || 6001;
const isProd = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production';

const ALLOWED_ORIGINS = ['*'];

const apiRoutes = require('./routes');

const app = express();
app.use(morgan(isProd ? 'combined' : 'dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (isProd) {
    app.use((req, res, next) => {
        const { origin } = req.headers;
        if (origin && (ALLOWED_ORIGINS.indexOf(origin) > -1 || ALLOWED_ORIGINS.includes('*'))) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, cookie, accesstoken'
        );
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });
} else {
    app.use(cors());
}

app.use('/', apiRoutes);

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        server = app.listen(PORT, () => {
            console.log(`listening on: http://localhost:${PORT}`);
        });
    });

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${MONGO_URI}`);
});
