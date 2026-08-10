import { socialsArr } from "@/consts";
import { Mail } from "lucide-react";
import Image from "next/image";

export default function ConnectPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center py-5 sm:py-20 px-4 animate-in fade-in duration-700">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
          Connect With Me
        </h1>
        <div className="h-1.5 w-20 bg-primary rounded-full mb-8 mx-auto"></div>
        <p className="mb-12 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Feel free to reach out for collaborations, opportunities, or just to say hi! I&apos;m always excited to connect with like-minded individuals.
        </p>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-6">
            {socialsArr.map((item, index) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-primary/10 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20 animate-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
                aria-label={item.name}
              >
                <Image
                  src={item.path}
                  alt={"logo of " + item.name}
                  height={32}
                  width={32}
                  className="dark:hidden transition-transform duration-300 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                />
                <Image
                  src={item.path.replace(".svg", ".light.svg")}
                  alt={"logo of " + item.name}
                  height={32}
                  width={32}
                  className="hidden dark:block transition-transform duration-300 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                />
              </a>
            ))}
          </div>

          <div className="relative mt-4 w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground">or directly via email</span>
            </div>
          </div>

          <a
            href="mailto:dipanshuchoksi@gmail.com"
            className="inline-flex mt-2 items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(13,148,136,0.5)] focus:ring-2 focus:ring-primary/50 group"
          >
            <Mail
              size={20}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:rotate-6"
            />
            dipanshuchoksi@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
