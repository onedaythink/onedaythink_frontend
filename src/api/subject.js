import { createJsonAxiosInstance } from "./index";

async function $getSubjects(){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('subjects');        
    } catch (err) {
        console.log(err);
    }
}

async function $postMainSubject(yyyymmdd){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.post('subjects/main/'+yyyymmdd);        
    } catch (err) {
        console.log(err);
    }
}

export { $getSubjects, $postMainSubject }