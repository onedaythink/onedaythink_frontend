import axios from 'axios';

function createAxiosInstance() {
    return axios.create({
        withCredentials: true,
        baseURL: 'http://127.0.0.1:8080/onedaythink/api/v1/'
    })
}

function createFlaskAxiosInstance() {
  return axios.create({
      withCredentials: true,
      baseURL: 'http://127.0.0.1:5000/'
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
  
  export {createJsonAxiosInstance, createFormAxiosInstance, createJsonFlaskAxiosInstance }