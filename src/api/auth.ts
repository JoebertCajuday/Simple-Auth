import { Router } from 'express';
import Auth from '../controllers/auth.js'
import { errorHandler } from '../middlewares/error_handler.js';
import { checkRequiredFields } from '../Helpers/checkers.js';
import { emailChecker } from '../Helpers/index.js';


const auth_route = Router();


auth_route.post('/sign_up', async(req, res, next) => {
    try{
        const required = [
            'user_name', 
            'email', 
            'password',
            'firstname',
            'middlename',
            'lastname',
        ];

        // Check if required fields are set
        if(!checkRequiredFields(required, Object.keys(req.body))){
            throw new Error('Please fill all required fields');
        }

        // Check if email is in valid format
        if(!emailChecker(req.body.email)){
            throw new Error('Invalid email. Please use a valid email');
        }

        next();
    }catch(err){
        next(err);
    }
}, Auth.sign_up);


auth_route.post('/sign_in', async(req, res, next) => {
    try{
        // Check payload
        if((!req.body.user_name && !req.body.email) || !req.body.password){
            throw new Error('Please fill all required fields');
        }

        next();
    }catch(err){
        next(err);
    }
}, Auth.sign_in);


// Middleware
auth_route.use(errorHandler);


export default auth_route;

