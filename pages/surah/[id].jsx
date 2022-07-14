import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getASurah } from "../../core/services/surah.service";
import Layout from "../../layout/Layout";
import axios from "axios";
import { API_URL2 } from "../../core/config/environment";

const Surah = () => {
  const router = useRouter();
  const [surah, setSurah] = useState(null);
  const { id } = router.query;
  useEffect(() => {
    axios
      .get(API_URL2 + "surah/" + id + "/ar.hanirifai")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    getASurah(id)
      .then((res) => {
        let data = res.data.data;
        const first_ayah = data.ayahs[0].text.split(" ");
        first_ayah.splice(0, 4);
        let ff_ayah = first_ayah.join(" ");
        data.ayahs[0].text = ff_ayah;
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
        {surah && (
          <div className="w-full">
            <h1 className="text-center my-5 text-3xl underline underline-offset-8">
              {surah.name}
            </h1>
            {surah.ayahs.map((ayah) => (
              <p
                className="text-right text-lg my-5 border-b pb-5"
                key={ayah.number}
              >
                {ayah.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Surah;
