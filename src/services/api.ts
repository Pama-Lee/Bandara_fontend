import { extend } from "umi-request";

export const request = extend({
    prefix: "https://flightapi.mocd.cc",
    timeout: 7000,
    headers: {
        "Content-Type": "application/json",
        "Token": localStorage.getItem("_token") || "",
    },
});

export default request;