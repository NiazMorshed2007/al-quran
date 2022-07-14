import { defaultRecitor } from "../utils/defaults";
import { getAll, getOne_un } from "./api";

const urls = {
  all_surahs: "surah",
  getOne: "surah",
};

export const getAllSurahs = async () => {
  return await getAll(urls.all_surahs);
};

export const getASurah = async (number, recitor) => {
  return await getOne_un(urls.getOne, `${number}/ar.${defaultRecitor}`);
};
