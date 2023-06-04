import SockJS from "sockjs-client";

function getUrl() {
 return process.env.VUE_APP_BASE_URL_IP_ADDRESS;
}

function getNotifySocket() {
    const BASE_URL = getUrl()
    return new SockJS(`http://${BASE_URL}:8080/onedaythink/stomp/notify/ws`);
}

function getChatSocket() {
    const BASE_URL = getUrl()
    return new SockJS(`http://${BASE_URL}:8080/onedaythink/stomp/ws`);
}

function getHaruChatSocket() {
    const BASE_URL = getUrl()
    return new SockJS(`http://${BASE_URL}:8080/onedaythink/stomp/haru/ws`);
}

export { getNotifySocket, getChatSocket, getHaruChatSocket}