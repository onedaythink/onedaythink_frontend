import { createJsonAxiosInstance } from "./index";



async function $createReport(chatRoomNo,reportReason){
    try {
        const axios = createJsonAxiosInstance()
        const data = {
            "chatRoomNo": chatRoomNo,
            "chatReportNo": reportReason
        }       
        return await axios.post('chatting/report', data);        
    } catch (err) {
        console.log(err);
    }
}

async function $getReport(){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('chatting/report/reportAll');        
    } catch (err) {
        console.log(err);
    }
}



export { $createReport,$getReport }