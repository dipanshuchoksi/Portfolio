import Image from "next/image";

function ProjectItem() {
  return (
    <div className="rounded-2xl flex gap-10">
      <div className="w-fit">
        <Image
          src="/images/netflixGpt.png"
          alt="netflixgpt project image"
          width={500}
          height={200}
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl">NetflixGPT</h2>
        <p>Techstack : ReactJS, TailwindCSS, Firebase, OpenAI API</p>
        <p>
          NetflixGPT is an AI-powered recommendation system that suggests movies
          based on the mood you describe. Simply tell it how you&apos;re
          feeling, and it curates a list of films that match your emotional
          vibe, ensuring the perfect watch for any moment.
        </p>
      </div>
    </div>
  );
}

export default ProjectItem;
