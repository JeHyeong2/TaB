import axios from "axios";


export const arduinoAPI = axios.create({
  baseURL: "https://i9d111.p.ssafy.io:8000/tab/arduino/",
});
export const busAPI = axios.create({
  baseURL: "https://i9d111.p.ssafy.io:8000/tab/station/",
});
export const noticeAPI = axios.create({
  baseURL: "https://i9d111.p.ssafy.io:8000/tab/notice/",
  // baseURL: "http://localhost:8000/notice/",
});
export const boardAPI = axios.create({
  // baseURL: "https://i9d111.p.ssafy.io:8001/notice/",
  baseURL: "https://i9d111.p.ssafy.io:8000/tab/board",
});
export const webAPI = axios.create({
  baseURL: "https://i9d111.p.ssafy.io:8000/tab/"
})

