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

async function $postAdminSubject(test_text,newVal){
    try{
        const axios = createJsonAxiosInstance()
        const data = {
            content: test_text,
            subImgPath: newVal
        }
        console.log(data)
        return await axios.post('subjects', data);        
    } catch(err){
        console.log(err);
    }

}

export { $getSubjects, $postMainSubject, $postAdminSubject }