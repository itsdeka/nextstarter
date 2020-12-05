import Router from "next/router"; import FormData from "form-data";

const fetch = require("node-fetch");

export const API = `http://127.0.0.1:8000/api`;

export const VERBS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  HEAD: "HEAD",
  PATCH: "PATCH",
  OPTIONS: "OPTIONS"
}

/**
 * Send a request using node-fetch and automatically inserting the user's access-token in the Authorization header.
 * 
 * @param url - The URL to send the request to;
 * @param method - The verb/method with which to make the request, by default it is set to `"GET"`;
 * @param body - The body of the request if necessary, by default it is set to `null`;
 *
 * @returns The awaited response returned by the fetch function.
 *
 * @remarks The function works with Content-Type `application/json` and `multipart/form-data` but can be easily extended
 */
export async function authorization(url, method = "GET", body = null) {
  const token = window.localStorage.getItem("access-token"); // Or any other way you want to use to retrieve the user's access-token

  const headers = {
    "Accept": "application/json"
  };

  if(token && token != 'undefined' && token != 'null')
    headers["Authorization"] = `Bearer ${token}`;

  if(body instanceof FormData == false)
    headers["Content-Type"] = "application/json";

  return await fetch(url, {
    method, headers,
    body: body ? body instanceof FormData ? body : JSON.stringify(body) : null
  });
}    

/**
* Send a request using node-fetch and, if the response status code matches `401 Unauthorized`, send a request to 
* refresh the` access-token` using the `refresh-token` of the authenticated user. 
* If the latter is successful, it will retry the first request and return the response, 
* otherwise it means that the user's session has expired.
* 
* @param url - The URL to send the request to;
* @param method - The verb/method with which to make the request, by default it is set to `"GET"`;
* @param body - The body of the request if necessary, by default it is set to `null`;
*
* @returns The awaited response returned by the fetch function.
*
* @remarks The function works with Content-Type `application/json` and `multipart/form-data` but can be easily extended
*/
export async function middleware(url, method = "GET", body = null) {
  let response = await authorization(url, method, body);

  if(response.status == 401) {
    const body = {
      refresh: window.localStorage.getItem("refresh-token") // Or any other way you want to use to retrieve the user's refresh-token
    };
  
    const refresh = await fetch(`${API}/token/refresh`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    if(refresh.status == 400 || refresh.status == 401 || refresh.status == 403) 
      Router.push("/auth", undefined, { shallow: true });
    
    const data = await refresh.json();

    window.localStorage.setItem("access-token", data.access);

    response = await authorization(url, method, body);
  }

  return response;
}