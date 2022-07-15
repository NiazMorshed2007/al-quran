import { http_secured } from "../helpers/http";

export const getAll = (path) => {
  const url = path;
  return http_secured.get(url);
};

export const getOne = (path, id) => {
  const url = `${path}/${id}`;
  return http_secured.get(url);
};
