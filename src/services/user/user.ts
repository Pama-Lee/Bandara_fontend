import {request} from "../api";

export async function LoginService(params: any) {
  return request("/api/rootjam/login", {
    method: "POST",
    data: params,
  });
}