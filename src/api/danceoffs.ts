import { IParams } from "@/models";
import { DanceOffPayload } from "@/models/danceoff";
import config from "./config";

const url = "https://challenge.parkside-interactive.com/api";

export const getDanceoffs = async (params: IParams) => {
  if (!params.page_size) {
    params.page_size = 100;
  }
  if (!params.page) {
    params.page = 1;
  }
  let requestUrl = `${url}/danceoffs?page=${params.page}&page_size=${params.page_size}`;

  const response = await fetch(requestUrl, {
    method: "GET",
    ...config(),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw await response.json();
  }
};
export const getPopulatedDanceoffs = async (params: IParams) => {
  if (!params.page_size) {
    params.page_size = 10;
  }
  if (!params.page) {
    params.page = 1;
  }
  let requestUrl = `${url}/danceoffs/populated?page=${params.page}&page_size=${params.page_size}`;

  const response = await fetch(requestUrl, {
    method: "GET",
    ...config(),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw await response.json();
  }
};

export const getDanceoff = async (params: DanceOffPayload) => {
  const response = await fetch(`${url}/danceoffs/${params.id}/`, {
    method: "GET",
    ...config(),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw await response.json();
  }
};

export const createDanceoff = async (payload: DanceOffPayload) => {
  const response = await fetch(`${url}/danceoffs`, {
    method: "POST",
    body: JSON.stringify(payload),
    ...config(),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw await response.json();
  }
};
