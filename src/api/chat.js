import { createJsonAxiosInstance } from "./index";

async function $createChatRoom(userOpiNo, userNo){
    try {
        const axios = createJsonAxiosInstance()
        const data = {
            toUserOpiNo : userOpiNo,
            fromUserNo: userNo
        }        
        return await axios.post('chat/rooms/', data);        
    } catch (err) {
        console.log(err);
    }
}

async function $getChatRooms(userNo){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('chat/rooms/'+userNo);        
    } catch (err) {
        console.log(err);
    }
}


export { $createChatRoom, $getChatRooms }