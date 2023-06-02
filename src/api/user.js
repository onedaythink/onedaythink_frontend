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

// 닉네임 중복 체크 구현
async function $checkNickname(userData){
    try {
    const axios = createJsonAxiosInstance()
        return await axios.post('auth/signup/nickname-check', userData)
    }
    catch (err) {
        console.log('error msg : ', err)
    }
}

// 이메일 중복 체크 구현
async function $checkEmail(userData){
    try {
    const axios = createJsonAxiosInstance()
        return await axios.post('user/newUserUpdate/email-check', userData)
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

// 회원 프로필 이미지 수정
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
async function $updateUser(newUserUpdate){
    try {
        const axios = createFormAxiosInstance()
        return await axios.post('mypage/users/updateprofile', newUserUpdate)
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
        $checkEmail, $getUsers, $deleteUser, $updateUser, $updateUserProfile }