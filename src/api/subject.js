import { createJsonAxiosInstance } from "./index";

// 모든 논제 조회
async function $getSubjects(){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('subjects');        
    } catch (err) {
        console.log(err);
    }
}

// 논제 개별 조회
async function $getSubject(subNo){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('subjects/' + subNo);        
    } catch (err) {
        console.log(err);
    }
}

// 논제 메인에 사용된 날짜 추가 ? 랜덤 조회는 아닌가?
async function $postMainSubject(yyyymmdd){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.post('subjects/main/'+yyyymmdd);        
    } catch (err) {
        console.log(err);
    }
}

// 논제 추가
async function $addSubject(currnet_subject){
    try {
        const axios = createJsonAxiosInstance()
        console.log(currnet_subject.subNo)
        return await axios.post('subjects/'+currnet_subject.subNo, currnet_subject);        
    } catch (err) {
        console.log(err);
    }
}

// 논제 삭제
async function $deleteSubject(subNo){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.post('subjects/delete/'+ subNo);             
    } catch (err) {
        console.log(err);
    }
}

// 논제 수정
async function $updateSubject(subNo){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.post('subjects/update/'+ subNo);        
    } catch (err) {
        console.log(err);
    }
}

export { $getSubjects, $getSubject, $postMainSubject, $addSubject, 
    $deleteSubject, $updateSubject }