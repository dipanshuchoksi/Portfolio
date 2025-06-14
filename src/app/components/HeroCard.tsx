import Image from "next/image";
import { HeroCardInterface } from "../interface";

function HeroCard({ data }: { data: HeroCardInterface }) {
  return (
    <div className="border border-text/50 bg-background-accent flex flex-col gap-5 rounded-md p-5 grow-1">
      <div className="text-2xl">
        <Image src={data.iconUrl} alt="Location icon" width={30} height={30} />
      </div>
      <div>
        <h3 className="text-xl">{data.title}</h3>
        <h3 className="text-text-accent">{data.subTitle}</h3>
      </div>
    </div>
  );
}

export default HeroCard;
