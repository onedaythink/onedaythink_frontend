import { createJsonAxiosInstance } from "./index"; 

async function $loginUser(loginData){
    try {
    const axios = createJsonAxiosInstance()
    return await axios.post('auth/login', loginData)
    }
    catch (err) {
        console.log('error msg : ', err)
    }
}

export { $loginUser }