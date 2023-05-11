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

// 논제 메인에 사용된 날짜 추가
async function $postMainSubject(yyyymmdd){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.post('subjects/main/'+yyyymmdd);        
    } catch (err) {
        console.log(err);
    }
}

// 논제 추가
async function $postAdminSubject(test_text,newVal){
    try{
        const axios = createJsonAxiosInstance()
        const data = {
            content: test_text,
            subImgPath: newVal
        }
        console.log(data)
        return await axios.post('subjects', data);        
    } catch(err){
        console.log(err);
    }

}

// 논제 삭제
async function $deleteSubject(subNoList){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.post('subjects/delete', subNoList);             
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

export { $getSubjects, $getSubject, $postMainSubject, 
    $deleteSubject, $updateSubject ,$postAdminSubject }

