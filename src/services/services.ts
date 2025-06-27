// src/services/apiClient.ts

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { API_ENDPONTS, URL } from "../constants/api-constants";
import { SignUpPayload } from "../types/customTypes";

// 1. Internal placeholders for “loading” and “error” callbacks.
//    Consumer code (e.g. App.tsx) will call registerLoadingHandler() and registerErrorHandler().
let onLoadingChange: (isLoading: boolean) => void = () => {};
let onError: (errorMsg: string) => void = () => {};

export function registerLoadingHandler(fn: (isLoading: boolean) => void) {
  onLoadingChange = fn;
}

export function registerErrorHandler(fn: (errorMsg: string) => void) {
  onError = fn;
}

// 2. Create the Axios instance
const apiClient = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
  // you could add a default timeout if you like:
  // timeout: 10000,
});

// 3. Request interceptor: notify “loading = true”
apiClient.interceptors.request.use(
  (config) => {
    // whenever any request starts, call onLoadingChange(true)
    onLoadingChange(true);
    return config;
  },
  (error: AxiosError) => {
    // if a request fails to even start, we still stop loading
    onLoadingChange(false);
    return Promise.reject(error);
  }
);

// 4. Response interceptor: notify “loading = false” and pass through
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // on any successful response, stop loading
    onLoadingChange(false);
    return response;
  },
  (error: AxiosError) => {
    // on any response error, stop loading and notify via onError()
    onLoadingChange(false);

    // If the error response carries a message, you can extract it.
    let message = "An unexpected error occurred";
    if (error.response?.data && typeof error.response.data === "object") {
      // assume backend returns { message: "..." }
      // adjust if your API has a different shape
      message =
        (error.response.data as any).message ||
        JSON.stringify(error.response.data);
    } else if (error.message) {
      message = error.message;
    }

    // call the registered error handler
    onError(message);
    return Promise.reject(error);
  }
);


// 5. Export your API functions as usual:
export function signUp(payload: SignUpPayload) {
  return apiClient.post(API_ENDPONTS.SIGN_UP, payload);
}

export function login(email: string, password: string) {
  return apiClient.post(API_ENDPONTS.LOGIN, { email, password });
}

export function fetchUserData(apiData:any) {
  return apiClient.get(`${API_ENDPONTS.FETCH_USER_DATA}/${apiData.userId}`, 
    {
    headers: {  Authorization: `Bearer ${apiData.token}` }
  }
);
}


export function addRestaurant(payload:any) {
  let token = sessionStorage.getItem("authToken");
  console.log("token in addRestaurant:", token);
  
  return apiClient.post(API_ENDPONTS.ADD_RESTAURANT, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function modifyRestaurant(payload:any,restaurantId:string) {
  let token = sessionStorage.getItem("authToken");
  console.log("token in addRestaurant:", token);
  
  return apiClient.put(`${API_ENDPONTS.ADD_RESTAURANT}/${restaurantId}`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
}


export function searchRestaurantById(restaurantId: string) {
  let token = sessionStorage.getItem("authToken");
  console.log("token in addRestaurant:", token);
  
  return apiClient.get(`${API_ENDPONTS.ADD_RESTAURANT}/${restaurantId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
// …any other endpoints…
