import { defaultRecitor } from "../utils/defaults";
import { getAll, getOne } from "./api";

const urls = {
  all_surahs: "surah",
  getOne: "surah",
  recitors: "edition/format/audio",
};

export const getAllSurahs = async () => {
  return await getAll(urls.all_surahs);
};

export const getASurah = async (number, recitor) => {
  return await getOne(urls.getOne, `${number}/${recitor}`);
};

export const getEnglishTranslation = async (number, translator) => {
  return await getOne(urls.getOne, `${number}/en.asad`);
};

export const getRecitors = async () => {
  return await getAll(urls.recitors);
};
