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

async function $getChatMessages(chatRoomNo){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('chat/rooms/messages/'+chatRoomNo);        
    } catch (err) {
        console.log(err);
    }
}

// 전체 채팅방 조회 (관리자용)
async function $getChatRoomsAll(){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('admin/chatRoomsAdmin');        
    } catch (err) {
        console.log('error msg : ', err);
    }
}

export { $createChatRoom, $getChatRooms, $getChatMessages, $getChatRoomsAll }