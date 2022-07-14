import React, { useEffect } from "react";
import { BsPlay, BsThreeDots, BsLink45Deg } from "react-icons/bs";

const Ayah = (props) => {
  const {
    number,
    surah,
    audio,
    ending_ayah_num,
    starting_ayah_num,
    text,
    activeAyah,
    setActiveAyah,
  } = props;
  useEffect(() => {
    const a = document.querySelector(`.audio-active`);
    if (number === activeAyah) {
      a.play();
    }
  }, [activeAyah]);
  return (
    <div
      className={`${
        activeAyah === number && "bg-gray-50/50"
      } mb-5 px-3 flex rounded-xl hover:bg-gray-50/50 transition-all items-center justify-between`}
      key={number}
    >
      <div className="text-slate-500 flex flex-col items-center">
        <p className="pb-2 text-sm">
          {surah.number}:{number}
        </p>
        <i
          onClick={() => {
            setActiveAyah(number);
          }}
          className="action-btn"
        >
          <BsPlay />
        </i>
        <i className="action-btn">
          <BsLink45Deg />
        </i>
        <i className="action-btn">
          <BsThreeDots />
        </i>
      </div>
      <div>
        <audio
          className={`invisible ${
            number === activeAyah ? "audio-active" : "audio-inactive"
          }`}
          onEnded={() => {
            setActiveAyah((prev_ayah) =>
              prev_ayah === ending_ayah_num ? 0 : prev_ayah + 1
            );
          }}
          src={audio}
          controls
        ></audio>
        <p className="text-right tracking-wide leading-10 text-2xl my-5 pb-5">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Ayah;
