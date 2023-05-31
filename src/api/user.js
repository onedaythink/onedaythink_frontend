import { createJsonAxiosInstance, createFormAxiosInstance } from "./index"; 

async function $loginUser(loginData){
    try {
    const axios = createJsonAxiosInstance()
    return await axios.post('auth', loginData)
    }
    catch (err) {
        console.log('error msg : ', err)
    }
}

async function $registerUser(userData){
    try {
    const axios = createJsonAxiosInstance()
    return await axios.post('auth/signup', userData)
    }
    catch (err) {
        console.log('error msg : ', err)
    }
}

async function $checkUserId(userData){
    try {
    const axios = createJsonAxiosInstance()
        return await axios.post('auth/signup/id-check', userData)
    }
    catch (err) {
        console.log('error msg : ', err)
    }
}

async function $checkNickname(userData){
    try {
    const axios = createJsonAxiosInstance()
        return await axios.post('auth/signup/nickname-check', userData)
    }
    catch (err) {
        console.log('error msg : ', err)
    }
}

// 회원탈퇴
async function $deleteUser(userData){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.post(`users/${userData.userNo}`, userData)
    }
    catch (err) {
        console.log('error msg : ', err)
    }
}

// 회원 프로필 수정
async function $updateUserProfile(formData){
    try {
        const axios = createFormAxiosInstance()
        return await axios.post('mypage/users/updateprofile', formData)
    }
    catch (err) {
        console.log('error msg : ', err)
    }
}

// 회원수정
async function $updateUser(userData){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.post('mypage/users/update', userData)
    }
    catch (err) {
        console.log('error msg : ', err)
    }
}


// 전체 회원 조회(관리자)
async function $getUsers(){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.get('admin/usersAdmin');        
    } catch (err) {
        console.log('error msg : ', err);
    }
}


export { $loginUser, $registerUser, $checkUserId, $checkNickname, 
        $getUsers, $deleteUser, $updateUser, $updateUserProfile }