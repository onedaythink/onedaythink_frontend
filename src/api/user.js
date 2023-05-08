import { createJsonAxiosInstance } from "./index"; 

// 로그인
async function $loginUser(loginData){
    try {
    const axios = createJsonAxiosInstance()
    return await axios.post('auth', loginData)
    }
    catch (err) {
        console.log('error msg : ', err)
    }
}

// 전체 회원 조회
async function $getUsers(){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('admin/usersAdmin');        
    } catch (err) {
        console.log('error msg : ', err);
    }
}


export { $loginUser, $getUsers }