
export const checkRequiredFields = (required: string[], arr: string[]) => {

    for(let x = 0; x < required.length; x++){
        if(!arr.includes(required[x])){
            return null;
        }
    }
    return true;
}


