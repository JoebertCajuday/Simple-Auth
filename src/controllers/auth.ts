import {Request, Response, NextFunction} from 'express';
import { Op } from 'sequelize';
import { sequelize } from '../configs/db_connect.js';

import Users from '../models/User.js';
import UserInformation from '../models/UserInformation.js';
import Messages from '../Helpers/messages.js';
import { compareHash, hash, tokenize } from '../Helpers/hash.js';


export const sign_in = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { user_name, email, password } = req.body

        // Get equivalent data
        const findone = await Users.findOne({
            where: { [Op.or] : [{user_name: user_name?? null}, {email: email?? null} ] }
        });
        if(!findone){ throw new Error(`Incorrect username/email or password`); }

        // Compare hashed passwords
        let compareResult = await compareHash(password, findone.password);
        if(!compareResult){
            throw new Error(`Incorrect username/email or password`);
        }

        // Create JWT
        await tokenize(
            {
                user_id: findone.id,
                user_name: findone.user_name,
                email: findone.email
            },
            (err: Error, token: string) => {
                if(err){
                    throw new Error(err.message);
                }
                res.setHeader('Authorization', `Bearer ${token}`)
                .send(Messages.jsonSuccessResponse([{ token: token }], req.method ));
            }, 
            "1h",
        );

    }
    catch(err){
        next(err)
    }
}



export const sign_up = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {user_name, email, password, firstname, middlename, lastname} = req.body

        // Perform username and email checks in the database
        const info_check = await Users.findAll({
            where: {
                [Op.or] : [ {user_name: user_name},{email: email} ]
            }
        })
        if(info_check[0]){ throw new Error('Username or Email is not available'); }

        
        let hashed_user = req.body;
        hashed_user.password = await hash(password, 10);

        const result = await sequelize.transaction(async (transac) => {

            const user = await Users.create(hashed_user, { transaction: transac});

            let user_obj = {
                first_name: firstname,
                middle_name: middlename,
                last_name: lastname,
                user_Id: user.id
            }
            // Insert to user info table
            const user_info = await UserInformation.create(user_obj, { transaction: transac });

            return Object.assign({}, user, user_info)
        }); 

        res.send(Messages.jsonSuccessResponse(result, req.method));
    }
    catch(err){
        next(err);
    }
}



const Auth = {
    sign_in,
    sign_up
}
export default Auth