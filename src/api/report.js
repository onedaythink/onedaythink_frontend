import { createJsonAxiosInstance } from "./index";

// insert into chat_report_tb (`chat_room_no`, `r_t_no`, `report_result`, `accused_user_no`)
// values
// (#{chatRoomNo}, #{reportNo}, #{reportResult}, #{accusedUserNo})

async function $createReport(chatRoomNo,reportReason){
    try {
        const axios = createJsonAxiosInstance()
        const data = {
            "chatRoomNo": chatRoomNo,
            "reportNo": reportReason
        }       
        return await axios.post('chatting/report', data);        
    } catch (err) {
        console.log(err);
    }
}



export { $createReport }