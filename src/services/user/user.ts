import {request} from "../api";

export async function LoginService(params: any) {
  return request("/auth/login", {
    method: "POST",
    data: params,
  });
}

export async function LoginWithRootJam(token:string) {
  return request("/auth/getToken", {
    method: "GET",
    params: {
      token
    }
  });
}

// 完善用户信息
export async function completeUserInfo(params: any) {
  return request("/user/update", {
    method: "PUT",
    data: params,
  });
}