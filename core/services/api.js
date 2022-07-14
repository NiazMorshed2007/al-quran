import { http_secured, http_unsecured } from "../helpers/http";

export const getAll = (path) => {
  const url = path;
  return http_secured.get(url);
};

export const getOne_s = (path, id) => {
  const url = `${path}/${id}}`;
  return http_secured.get(url);
};
export const getOne_un = (path, id) => {
  const url = `${path}/${id}}`;
  return http_unsecured.get(url);
};
