import { createJsonFlaskAxiosInstance } from "./index";

async function $flaskTest(){
    try {
        const axios = createJsonFlaskAxiosInstance()
        // const data = {
        //     toUserOpiNo : userOpiNo,
        //     fromUserNo: userNo
        // }        
        return await axios.get('test');        
    } catch (err) {
        console.log(err);
    }
}

async function $questionForHaru(question){
    try {
        const axios = createJsonFlaskAxiosInstance()
        const data = {
            question : question
        }        
        return await axios.post('question-for-haru', data);        
    } catch (err) {
        console.log(err);
    }
}

export { $flaskTest, $questionForHaru }