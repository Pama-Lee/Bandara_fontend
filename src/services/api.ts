import { extend } from "umi-request";

export const request = extend({
    // 检查是否在localhost运行
     prefix: (window.location.href.indexOf("localhost") > -1) ? "http://localhost:9999" : "https://flightapi.mocd.cc",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Token": localStorage.getItem("_token") || "",
    },
});

export default request;