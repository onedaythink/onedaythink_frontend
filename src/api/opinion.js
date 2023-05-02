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

async function $addOpinion(currnet_opinion){
    try {
        const axios = createJsonAxiosInstance()
        console.log(currnet_opinion.userNo)
        return await axios.post('opinions/'+currnet_opinion.userNo, currnet_opinion);        
    } catch (err) {
        console.log(err);
    }
}

export { $getOpinions, $addOpinion, $getOpinion, $getOpinionsByCreateAt }