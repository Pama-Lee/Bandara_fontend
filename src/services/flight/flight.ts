import {request} from "../api";

// 获取航班详情
export async function getFlightDetail(params: any) {
    return request("/flight/detail", {
        method: "GET",
        params: params,
    });
}

// 获取航班列表
export async function getFlightListService(params: any) {
    return request("/flight/search", {
        method: "GET",
        params: params,
    });
}

// 新建航班
export async function newFlightService(params: any) {
    return request("/flight/add", {
        method: "POST",
        data: params,
    });
}

// 获取航班评论
export async function getFlightCommentService(params: any) {
    return request("/comment/get", {
        method: "GET",
        params: params,
    });
}

// 发送评论
export async function sendFlightCommentService(params: any) {
    return request("/comment/add", {
        method: "POST",
        data: params,
    });
}

// 加入航班
export async function joinFlightService(params: any) {
    return request("/flight/join", {
        method: "POST",
        data: params,
    });
}