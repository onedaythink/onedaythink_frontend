
import { createJsonAxiosInstance } from "./index";
import {useSubjectStore} from '@/store/subject';
import {useUserStore} from '@/store/user';

// 하루 캐릭터 조회
async function $getHaruChar(){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('haruchat');        
    } catch (err) {
        console.log('error msg : ', err);
    }
}
 
// 회원별 종료되지 않은 채팅방 전체 목록 조회
async function $getHaruChatRooms(userNo){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('/haruchat/rooms/'+userNo);
    } catch (err) {
        console.log(err);
    }
}

// 페르소나 쳇 입장 시 페르소나 의견 회신
async function $receiveFirstMsgFromChatGPT(haruchatchar){

    const subjectStore = useSubjectStore()
    const userStore = useUserStore()

    try{
        const axios = createJsonAxiosInstance()
        const data = {
            "userNo" : userStore.getLoginUser.userNo,
            "subject" : subjectStore.getSubject.content,
            "subNo"  : subjectStore.getSubject.subNo,
            "haruName" : {
            },
            "haruPrompt" : {

            },
            "haruNo" : {

            } 
        }

        let haruNoList = [];
        for (let haru in haruchatchar) {
            console.log(haru)

            data["haruName"][haruchatchar[haru].haruNo] = haruchatchar[haru].haruName
            data["haruPrompt"][haruchatchar[haru].haruNo] = haruchatchar[haru].haruPrompt
            haruNoList.push(haruchatchar[haru].haruNo)            
                      
        }
        data["haruNo"] = haruNoList


        // console.log(haruchatchar)
        // console.log(data)

        return await axios.post('haruchat/enter', data)
    } catch (err) {
        console.log('error ms : ', err);
    }
}

export { $getHaruChar, $getHaruChatRooms, $receiveFirstMsgFromChatGPT}
