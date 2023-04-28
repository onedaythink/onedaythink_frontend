import { createJsonAxiosInstance } from "./index";

async function $getSubject(){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get("subject");        
    } catch (err) {
        console.log(err);
    }
}

export { $getSubject }