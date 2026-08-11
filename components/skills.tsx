import { skillsSection } from "@/interfaces";

export default function Skills({ skillsContent }: { skillsContent: skillsSection }) {
  return (
    <section
      id="skills"
      className="border-b border-border min-h-[80vh] py-20 flex items-center bg-background/50 snap-start"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-16 animate-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
            Skills & Technologies
          </h2>
          <div className="h-1.5 w-20 bg-primary rounded-full mb-6"></div>
          <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
            {skillsContent.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillsContent.skills_items.map((category, index) => (
            <div
              key={category.category}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/20 backdrop-blur-md p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 animate-in slide-in-from-bottom-6"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0 pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="mb-5 text-xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                  {category.category}
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-lg bg-secondary/80 border border-border/50 px-3.5 py-1.5 text-sm font-medium text-foreground/90 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
