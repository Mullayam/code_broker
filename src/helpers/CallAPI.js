import axios from "axios";
const APIURL = process.env.REACT_APP_API_URL;

let headers = {
  "Content-Type": "application/json",
};

export async function CallApi(RestUrl, Method, params) {
  let response = await axios(`${APIURL}/${RestUrl}`, params, {
    method: `${Method}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
export async function PostApi(RestUrl, body) {
  let response = await axios.post(`${APIURL}/${RestUrl}`, body, headers);

  return response;
}
