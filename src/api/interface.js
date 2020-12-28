import request from "@/utils/request";

export function postList(url, data) {
  return request({
    url: "/sfa/backend" + url,
    method: "post",
    data
  });
}

export function homemapApi(url, data) {
  return request({
    url: "/sfa/backend" + url,
    method: "post",
    data
  });
}
