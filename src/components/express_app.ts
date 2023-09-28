import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from'morgan';

// Route Imports
import auth_route from '../api/auth.js';

const app = express();

// Middlewares
app.use(helmet()); // Handles Http response headers
app.use(bodyParser.json()); // Handles request body
app.use(bodyParser.urlencoded()); // Handles request body
app.use(cors()); // Handles CORS
app.use(morgan('combined')); // Handles request logging 

app.use(express.static('src/pages'));

app.get('/', async(req, res) => {
    res.render('index.html')
})
// Routes
app.use('/auth', auth_route);


export default app;
