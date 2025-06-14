import { skillArr } from "../const";

function SkillSection() {
  return (
    <div className="w-full mt-10">
      <h2 className="text-xl font-bold mb-3">Skills</h2>
      <div className="flex gap-2 flex-wrap">
        {skillArr.map(({ name, description }, index) => (
          <div key={index} className="relative group">
            <div className="px-5 py-2 rounded-lg bg-background-accent w-max cursor-pointer hover:bg-text-accent/50">
              {name}
            </div>
            <div className="absolute top-8 transform -translate-x-1/4 mt-2 w-48 bg-text-accent text-background text-sm rounded-lg px-3 py-2 opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible z-10">
              {description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillSection;
