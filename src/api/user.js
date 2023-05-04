import { createJsonAxiosInstance } from "./index"; 

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


export { $loginUser, $registerUser, $checkUserId, $checkNickname}