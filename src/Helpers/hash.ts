import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const compareHash = async(password: string, hashed: string) => {
    return await bcrypt.compare(password, hashed);
}

export const hash = async(password: string, salt: number) => {
    return await bcrypt.hash(password, salt);
}

export const tokenize = async(jsonObject = {}, callback: Function, expiration = '1h', ) => {

    return jwt.sign(jsonObject, "secret_key", { expiresIn: expiration}, (err, token) => {
            
        if(!callback){
            return err ? null : token;
        }

        if(err){
            return callback(err, null);
        }

        if(token){
            return callback(null, token);
        }
    });
}