import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsFillPlayFill, BsChevronDown } from "react-icons/bs";
import Ayah from "../../components/Ayah";
import Bismillah from "../../components/Bismillah";
import Header from "../../components/Header";
import {
  getASurah,
  getEnglishTranslation,
  getRecitors,
} from "../../core/services/surah.service";
import { defaultRecitor } from "../../core/utils/defaults";
import Layout from "../../layout/Layout";

const Surah = () => {
  const router = useRouter();
  const [isOpened, setIsOpened] = useState(false);
  const [recitors, setRecitors] = useState([]);
  const [currentRecitor, setCurrentRecitor] = useState("");
  const [surah, setSurah] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [activeAyah, setActiveAyah] = useState(0);
  const [starting_ayah_num, set_starting_ayah_num] = useState(0);
  const [ending_ayah_num, set_ending_ayah_num] = useState(0);
  const { id } = router.query;

  const selectRecitor = (str) => {
    setCurrentRecitor(str);
  };

  useEffect(() => {
    getASurah(id, currentRecitor !== "" ? currentRecitor : defaultRecitor)
      .then((res) => {
        let data = res.data.data;
        const first_ayah = data.ayahs[0].text.split(" ");
        first_ayah.splice(0, 4);
        let ff_ayah = first_ayah.join(" ");
        data.ayahs[0].text = ff_ayah;
        set_starting_ayah_num(data.ayahs[0].number);
        set_ending_ayah_num(data.ayahs[data.ayahs.length - 1].number);
        setSurah(data);
      })
      .catch((err) => console.log(err));
  }, [currentRecitor, id]);

  useEffect(() => {
    if (id !== undefined) {
      getRecitors()
        .then((res) => {
          setRecitors(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });

      getEnglishTranslation(id)
        .then((res) => {
          let data = res.data.data;
          setTranslation(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);
  return (
    <Layout>
      <Header
        s_name={surah && surah.englishName}
        prefix={
          <div className="md:text-sm text-xs relative cursor-pointer">
            <div
              onClick={() => {
                setIsOpened(!isOpened);
              }}
              className="flex p-2 px-4 bg-gray-200/60 text-slate-700 rounded-3xl  items-center gap-2"
            >
              <p>
                Rec: {currentRecitor !== "" ? currentRecitor : "Hani Rifai"}
              </p>
              <BsChevronDown />
            </div>
            <div
              className={`absolute ${
                isOpened ? "opacity-100 visible" : " opacity-0 invisible"
              } transition-all overflow-y-auto -bottom-2 p-1 translate-y-full border rounded-xl w-[320px] bg-white shadow-md h-80 -left-36`}
            >
              {recitors.map((rec) => (
                <div
                  key={rec.identifier}
                  onClick={() => {
                    setCurrentRecitor(rec.identifier);
                  }}
                  className={`p-3 w-full ${
                    currentRecitor !== ""
                      ? currentRecitor === rec.identifier && "bg-primary/20"
                      : "ar.hanirifai" === rec.identifier && "bg-primary/20"
                  } hover:bg-gray-100 rounded-xl`}
                >
                  {rec.englishName}
                </div>
              ))}
            </div>
          </div>
        }
      />
      <div className="mx-[2%] md:mx-[14%] border p-5 rounded-md bg-orange-200/20 my-10 flex flex-col items-center">
        <div className="type relative mb-7 w-[300px] rounded-3xl p-1 bg-white flex items-center">
          <div className="w-1/2 z-20 text-slate-600 text-sm text-center cursor-pointer h-full rounded-3xl p-2 transition-all hover:bg-gray-50">
            Translation
          </div>
          <div className="w-1/2 text-slate-600 text-sm text-center cursor-pointer h-full rounded-3xl p-2 transition-all hover:bg-gray-50">
            Reading
          </div>
        </div>
        <h1 className="text-center my-5 text-4xl underline underline-offset-8">
          {surah && surah.name}
        </h1>
        <div className="my-5">
          <Bismillah />
        </div>
        <div className="flex w-full mt-5 mb-10 items-center justify-between">
          {/* <div>
            <p className="text-sm text-slate-600">Translation by</p>
            <h2 className=" text-base">
              Dr. Mustafa Khattab, the Clear Quran{" "}
              <span className="text-primary">(Change)</span>
            </h2>
          </div> */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => {
                setActiveAyah(starting_ayah_num);
              }}
              className="p-1 flex items-center gap-1 rounded-md px-2 transition-all cursor-pointer hover:bg-primary/10 text-primary"
            >
              <BsFillPlayFill />
              <p>Play Audio</p>
            </div>
          </div>
        </div>
        {surah && (
          <div className="w-full">
            {surah.ayahs.map((ayah, index) => (
              <Ayah
                activeAyah={activeAyah}
                starting_ayah_num={starting_ayah_num}
                ending_ayah_num={ending_ayah_num}
                setActiveAyah={setActiveAyah}
                key={ayah.number}
                {...ayah}
                translation={translation && translation.ayahs[index].text}
                surah={surah}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Surah;
