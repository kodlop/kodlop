"use server";

import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  headers: {},
});

const BASE_URL = process.env.BACKEND_SERVER_URL;

// Define a generic function for handling API requests
async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await api(config);
    return ({
      success: true,
      error: null,
      data: response.data.data,
      message: "Success"
    }) as T
  } catch (error) {
    console.error(error);
    return ({
      error: true,
      success: false,
      data: null,
      message: "Something went wrong!"
    }) as T
  }
}
async function post<T, D>(url: string, data: D): Promise<T> {
  const config: AxiosRequestConfig = {
    method: "POST",
    url,
    data: data
  }

  return apiRequest<T>(config);
}

type ResponseType = {
  success: boolean,
  error: boolean,
  data: any,
  message: string
}

export async function submitContactForm(data: any) {
  return post<ResponseType, any>(BASE_URL + '/contact', data);
}

export async function submitNewsletterForm(data: any) {
  return post<ResponseType, any>(BASE_URL + '/newsletter', data);
}