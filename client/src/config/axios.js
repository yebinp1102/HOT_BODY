import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hot-body-api.vercel.app",
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

// 토큰 만료시 로그아웃
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    if (err.response && err.response.data === "jwt expired") {
      sessionStorage.removeItem("accessToken");
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
