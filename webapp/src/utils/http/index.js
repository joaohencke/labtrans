import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8888/api"
});

export { instance };

export function addInterceptor(on = "request") {
  return (onSuccess, onFail) =>
    instance.interceptors[on].use(onSuccess, onFail);
}

export function authorization(auth) {
  instance.defaults.headers.common.Authorization = auth;
  return auth;
}

export function getAuthorization() {
  return instance.defaults.headers.common.Authorization;
}

export async function get(path, args) {
  try {
    const res = await instance.get(path, args);
    return res && res.data;
  } catch (e) {
    throw (e.response && e.response.data) || e;
  }
}

export async function post(path, args, options) {
  try {
    const res = await instance.post(path, args, options);
    return res && res.data;
  } catch (e) {
    throw (e.response && e.response.data) || e;
  }
}

export async function _delete(path, args) {
  try {
    const res = await instance.delete(path, args);
    return res && res.data;
  } catch(e) {
    throw (e.response && e.response.data) || e;
  }
}