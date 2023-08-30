import {request} from "../api";

// 获取航班详情
export async function getFlightDetail(params: any) {
    return request("/api/flight/detail", {
        method: "GET",
        params: params,
    });
}