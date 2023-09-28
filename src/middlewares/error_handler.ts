import {Request, Response, NextFunction} from 'express';
import Messages from '../Helpers/messages.js'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if(err){
        res.send(Messages.jsonFailResponse(err.message, req.method));
    }else{
        res.end();
    }
}