import Image from "next/image";
import { educationSectionArr } from "../const";

function EducationSection() {
  return (
    <div className="w-full mt-10">
      <h2 className="text-xl font-bold mb-3">Education</h2>
      {educationSectionArr.map(({ name, description, year, imgUrl }, index) => (
        <div className="flex gap-5 mb-5" key={index}>
          <div className="bg-white rounded-full flex items-center justify-center h-[40px] w-[40px]">
            <Image
              src={imgUrl}
              alt="School logo"
              height={40}
              width={40}
              className="rounded-full"
            />
          </div>
          <div>
            <div className="text-text-accent font-bold">{name}</div>
            <p>
              {description} : {year}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EducationSection;
