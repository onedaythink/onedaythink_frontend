import { createJsonAxiosInstance } from "./index";

async function $getOpinions(){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('opinions');        
    } catch (err) {
        console.log(err);
    }
}

async function $getOpinionsByCreateAt(subNo, userNo){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('opinions/create-at/' + subNo+'/'+userNo);        
    } catch (err) {
        console.log(err);
    }
}


async function $getOpinion(userNo, subDate){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('opinions/'+userNo+'/'+subDate);        
    } catch (err) {
        console.log(err);
    }
}

async function $getMyOpinions(userNo){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('opinions/mypage/'+userNo);        
    } catch (err) {
        console.log(err);
    }
}

async function $addOpinion(currnet_opinion){
    try {
        const axios = createJsonAxiosInstance()
        console.log(currnet_opinion.userNo)
        return await axios.post('opinions/'+currnet_opinion.userNo, currnet_opinion);        
    } catch (err) {
        console.log(err);
    }
}

async function $likeControll(userNo, userOpiNo){
    try {
        const axios = createJsonAxiosInstance()
        const data = {
            userNo : userNo,
            userOpiNo : userOpiNo
        }
        return await axios.post('opinions/like', data);        
    } catch (err) {
        console.log(err);
    }
}

// Mypage에서 opinion 수정
async function $updateOpinion(currnet_opinion){
    try {
        const axios = createJsonAxiosInstance()
        console.log(currnet_opinion.userNo)
        return await axios.post('opinions/'+currnet_opinion.userNo, currnet_opinion);
    } catch (err) {
        console.log(err);
    }
}

// Mypage에서 opinion 삭제
async function $deleteOpinion(currnet_opinion){
    try {
        const axios = createJsonAxiosInstance()
        console.log(currnet_opinion.userNo)
        return await axios.post('opinions/deleteopinion/'+currnet_opinion.userNo, currnet_opinion);
    } catch (err) {
        console.log(err);
    }
}

export { $getOpinions, $addOpinion, $getOpinion, $updateOpinion, $deleteOpinion,
         $getOpinionsByCreateAt, $likeControll, $getMyOpinions }