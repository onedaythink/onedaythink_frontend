import { createJsonAxiosInstance } from "./index";

// 하루 캐릭터 조회
async function $getHaruChar(){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('haruchat');        
    } catch (err) {
        console.log('error msg : ', err);
    }
}

// 페르소나 쳇 입장 시 페르소나 의견 회신
async function $receiveFirstMsgFromChatGPT(haruchatchar){
    try{
        const axios = createJsonAxiosInstance()
        const data = {
            "haruName" : {
            } 
        }

        for (let haru in haruchatchar) {
            console.log(haru)
            data["haruName"][haruchatchar[haru].haruNo] = haruchatchar[haru].haruName
        }


        console.log(haruchatchar)
        console.log(data)

        return await axios.post('haruchat/enter', data)
    } catch (err) {
        console.log('error ms : ', err);
    }
}

export { $getHaruChar, $receiveFirstMsgFromChatGPT}
