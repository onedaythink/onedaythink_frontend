import axios from 'axios';

function createAxiosInstance() {
    const BASE_URL = process.env.VUE_APP_BASE_URL_IP_ADDRESS;
    console.log(BASE_URL)
    return axios.create({
        withCredentials: true,
        baseURL: `http://${BASE_URL}:8080/onedaythink/api/v1/`
    })
}

function createFlaskAxiosInstance() {
  const BASE_URL = process.env.VUE_APP_BASE_URL_IP_ADDRESS;
  return axios.create({
      withCredentials: true,
      baseURL: `http://${BASE_URL}:5555/`
  })
}

function createJsonFlaskAxiosInstance () {
  const instance = createFlaskAxiosInstance()
  instance.defaults.headers.post['Content-Type'] = 'application/json; charset-8'
  return instance
}


function createJsonAxiosInstance (userInfo) {
    const instance = createAxiosInstance()
    instance.defaults.headers.post['Content-Type'] = 'application/json; charset-8'
    if (userInfo != null && userInfo.Authorization !== '') {
      instance.defaults.headers.common['Authorization'] = userInfo.Authorization
      instance.defaults.headers.common['RefreshTokenIdx'] = userInfo.RefreshTokenIdx
    }
    return instance
  }
  
  function createFormAxiosInstance (userInfo) {
    const instance = createAxiosInstance()
    instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    if (userInfo != null && userInfo.Authorization !== '') {
      instance.defaults.headers.common['Authorization'] = userInfo.Authorization
      instance.defaults.headers.common['RefreshTokenIdx'] = userInfo.RefreshTokenIdx
    }

    return instance
  }

  function findImage(userImg) {
    const BASE_URL = process.env.VUE_APP_BASE_URL_IP_ADDRESS;
    if (userImg) {
      const convertedPath = userImg.replace(/\\/g, '/');
      return `http://${BASE_URL}:8080/onedaythink/api/v1/imgfind/userImg?userImgPath=${convertedPath}`;
    } else {
      const defaultImg = 'src/main/resources/static/profileImages/default.png'
      return `http://${BASE_URL}:8080/onedaythink/api/v1/imgfind/userImg?userImgPath=${defaultImg}`;
    }
  } 
  
  export {createJsonAxiosInstance, createFormAxiosInstance, createJsonFlaskAxiosInstance, findImage}