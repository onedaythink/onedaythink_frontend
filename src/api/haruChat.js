import { createJsonAxiosInstance } from "./index";

// 메세지 전송하기
async function $sendMessage(data) {
    try {
        const axios = createJsonAxiosInstance();
        return await axios.post("haruchat/ongoingchat", data);
    }
    catch (err) {
        console.log(err);
    }
}

// 하루 챗 리스트 불러오기 : 보낸사람이미지와 마지막 메시지 노출
async function $getHaruChatRooms(userNo) {
    try {
        const axios = createJsonAxiosInstance();
        return await axios.get(`haruchat/rooms/${userNo}`);
    }
    catch (err) {
        console.log(err);
    }
}

// 특정 채팅방 접속 시 하루봇 메세지 불러오기 : 페르소나 이름과 메시지 내용 노출
async function $getHaruChatMessages(data){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.post('haruchat/rooms/messages', data);        
    } catch (err) {
        console.log(err);
    }
}

// 채팅방 삭제하기
async function $removeChatRoom() {
    try {
        const axios = createJsonAxiosInstance();
        const data = {
            
        }
        return await axios.post("haruchat", data);
    }
    catch (err) {
        console.log(err);
    }
}

export {$sendMessage, $getHaruChatRooms, $getHaruChatMessages, $removeChatRoom}