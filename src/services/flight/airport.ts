import request from "../api";

// 搜索机场
export const searchAirport = (keyword: string) => {
    return request("/airport/search/"+keyword, {
        method: "GET",
    });
} 

// 创建机场
export const createAirport = (params: any) => {
    return request("/airport/new", {
        method: "POST",
        data: params,
    });
}