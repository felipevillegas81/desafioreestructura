import express from 'express';
import config from './config/dotenv.config.js'
import routes from './routes/index.routes.js'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import mongoose from 'mongoose';
import Handlebars from 'handlebars';
import MongoStore from 'connect-mongo';
import initializePassport from './config/passport.config.js';
import passport from 'passport';

import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

const app = express()

//Session
app.use(cookieParser())
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: config.MONGO_URI,
            mongoOptions: {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            },
            ttl: 60 * 60 * 60
        }),
        collectionName: 'login',
        secret: config.SECRET_SESSION_KEY,
        resave: false,
        saveUninitialized: false,
    })
)

// MongoDB Atlas
mongoose.set('strictQuery', true);
mongoose.connect(config.MONGO_URI, (error) => {
    if(error) {
    console.log('Error to connect MongoDB Atlas', error);
    } else {
    console.log('Connected to MongoDB Atlas');
    }
})

//Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/', routes);
app.use('/session', routes);
app.use('/api', routes)

//app.get('*', (req,res) => {res.status(404).send('Pagina no Encontrada')})

app.listen(config.PORT, () => { console.log(`Server listening on port ${config.PORT}` )})