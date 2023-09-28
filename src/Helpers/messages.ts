import path from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export const jsonFailResponse = (msg = 'An error occured. Please try again later', req_method: string) => {
    return {
        status: 'Failed',
        message: msg,
        method: req_method
    };
}

export const jsonSuccessResponse = (data: {}=[] || {}, req_method: string) => {
    return {
        status: 'success',
        data: data,
        method: req_method
    };
}


let Messages = {
    jsonFailResponse,
    jsonSuccessResponse
}

export default Messages