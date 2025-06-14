import Image from "next/image";
import { heroCardArr } from "../const";
import HeroCard from "./HeroCard";

function HeroSection() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="h-58 w-58 bg-background-accent rounded-full mt-16 overflow-hidden">
          <Image
            src={"/myImage.jpeg"}
            alt="My Image"
            height={250}
            width={250}
            className=""
          />
        </div>
        <h1 className="text-2xl font-semibold mt-2">Dipanshu Choksi</h1>
        <p className="text-text-accent">Software Developer Engineer</p>
      </div>
      <div className="flex justify-items-stretch gap-5 mt-10 w-full">
        {heroCardArr.map((card, index) => (
          <HeroCard data={card} key={index} />
        ))}
      </div>
    </>
  );
}

export default HeroSection;
