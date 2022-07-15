import React from "react";
import { useRouter } from "next/router";

const SurahCard = (props) => {
  const router = useRouter();
  const navigateToSurah = (i) => {
    router.push("/surah/" + i);
  };
  const {
    number,
    name,
    englishName,
    englishNameTranslation,
    numberOfAyahs,
    revelationType,
  } = props;
  return (
    <div
      onClick={() => {
        navigateToSurah(number);
      }}
      className="p-3 w-[350px] md:w-[32%] surah-card flex items-center justify-between rounded border cursor-pointer transition-all hover:border-primary"
    >
      <div className="flex items-center gap-4">
        <div className="h-9 serial-num transition-all flex items-center justify-center w-9 text-gray-500 rounded rotate-45 bg-gray-100">
          <span className=" -rotate-45">{number}</span>
        </div>
        <div>
          <h1>{englishName}</h1>
          <h2 className="text-[11px] f-text mt-1 font-semibold text-gray-400">
            {englishNameTranslation}
          </h2>
        </div>
      </div>
      <div className="text-right">
        <h2>{name}</h2>
        <p className="text-[11px] f-text mt-2 font-semibold text-gray-400">
          Ayahs: {numberOfAyahs}
        </p>
      </div>
    </div>
  );
};

export default SurahCard;
