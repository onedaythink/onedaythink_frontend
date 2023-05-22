import { createJsonAxiosInstance } from "./index";

async function $createChatRoom(userOpiNo, userNo, nickname){
    try {
        const axios = createJsonAxiosInstance()
        const data = {
            toUserOpiNo : userOpiNo,
            fromUserNo: userNo,
            fromNickname: nickname
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

async function $closeChatRoom(chatRoomNo){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get(`chat/rooms/${chatRoomNo}/close`);        
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


export { $closeChatRoom, $createChatRoom, $getChatRooms, $getChatMessages, $getChatRoomsAll }