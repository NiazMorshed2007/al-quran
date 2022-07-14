import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import Ayah from "../../components/Ayah";
import Bismillah from "../../components/Bismillah";
import { getASurah } from "../../core/services/surah.service";
import Layout from "../../layout/Layout";

const Surah = () => {
  const router = useRouter();
  const [surah, setSurah] = useState(null);
  const [activeAyah, setActiveAyah] = useState(0);
  const [starting_ayah_num, set_starting_ayah_num] = useState(0);
  const [ending_ayah_num, set_ending_ayah_num] = useState(0);
  console.log(starting_ayah_num, ending_ayah_num);
  const { id } = router.query;

  useEffect(() => {
    getASurah(id)
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
  }, [id]);
  return (
    <Layout>
      <div className="px-[15%] py-16 flex flex-col items-center">
        <div className="type relative mb-7 w-[300px] rounded-3xl p-1 bg-gray-100 flex items-center">
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
          <div>
            <p className="text-sm text-slate-600">Translation by</p>
            <h2 className=" text-base">
              Dr. Mustafa Khattab, the Clear Quran{" "}
              <span className="text-primary">(Change)</span>
            </h2>
          </div>
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
            {surah.ayahs.map((ayah) => (
              <Ayah
                activeAyah={activeAyah}
                starting_ayah_num={starting_ayah_num}
                ending_ayah_num={ending_ayah_num}
                setActiveAyah={setActiveAyah}
                key={ayah.number}
                {...ayah}
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
