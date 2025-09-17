"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function BackToTopButon() {
  const [currPos, setCurrPos] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setCurrPos(scrollY);
    });
    return function () {
      window.removeEventListener("scroll", () => console.log("event removed"));
    };
  }, []);

  function handleBackToTop() {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }

  //   Do not show the button, until screen has been scrolled down.
  if (currPos < 100) {
    return null;
  }

  return (
    <div
      className="bg-text fixed right-12 bottom-5 rounded-full items-center flex justify-center cursor-pointer"
      onClick={handleBackToTop}
    >
      <Image
        src="./caret-top.svg"
        alt="back to top arrow image"
        height={50}
        width={50}
        className="mb-0"
      />
    </div>
  );
}

export default BackToTopButon;
