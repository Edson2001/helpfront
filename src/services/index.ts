import axios from "axios";

function getBaseURL() {
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:3006`;
  } else {
    return process.env.NEXT_PUBLIC_BACK_URL;
  }
}

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,

  //timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log(token, "***********");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  },
);

export default api;
