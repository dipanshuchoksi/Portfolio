import { interestSectionArr } from "../const";

function InterestSection() {
  return (
    <div className="w-full mt-5">
      <h2 className="text-xl font-bold mb-3">Interests</h2>
      <div className="flex gap-2 flex-wrap">
        {interestSectionArr.map((interestItem, index) => (
          <div
            className="px-5 py-2 rounded-lg bg-background-accent w-max cursor-default hover:bg-text-accent/50"
            key={index}
          >
            {interestItem}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterestSection;
