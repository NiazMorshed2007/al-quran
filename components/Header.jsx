import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

const Header = (props) => {
  const { s_name, prefix } = props;
  const router = useRouter();
  return (
    <header className="px-5 flex items-center justify-between py-3 sticky top-0 z-50 shadow-md bg-white border-b">
      <div className="flex items-center gap-3">
        {s_name && (
          <i
            onClick={() => {
              router.push("/");
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200/50 cursor-pointer"
          >
            <IoMdArrowBack />
          </i>
        )}
        {s_name ? <p>Surah {s_name}</p> : <>Home</>}
      </div>
      <div>{prefix}</div>
    </header>
  );
};

export default Header;
