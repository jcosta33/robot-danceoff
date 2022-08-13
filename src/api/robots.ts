import { IParams } from "@/models";
import config from "./config";

const url = "https://challenge.parkside-interactive.com/api";

export const getRobots = async (params: IParams) => {
  if (!params.page_size) {
    params.page_size = 100;
  }
  if (!params.page) {
    params.page = 1;
  }
  let requestUrl = `${url}/robots/?page=${params.page}&page_size=${params.page_size}`;

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

export const getRobot = async (params: IParams) => {
  const response = await fetch(`${url}/v1/robot/${params.id}/`, {
    method: "GET",
    ...config(),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw await response.json();
  }
};
