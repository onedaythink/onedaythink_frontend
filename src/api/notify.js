import { createJsonAxiosInstance } from "./index";

async function $getNotifies(userNo) {
    try {
        const axios = createJsonAxiosInstance()      
        return await axios.get('notify/users/'+userNo);        
    } catch (err) {
        console.log(err);
    }
}

async function $editNotify(data) {
    try {
        const axios = createJsonAxiosInstance()
        console.log(data)
        return await axios.post('notify/edit/users', data);        
    } catch (err) {
        console.log(err);
    }
}

export { 
    $getNotifies, $editNotify
}