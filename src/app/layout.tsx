import Image from "next/image";
import Navbar from "./components/Navbar";
import "./globals.css";
import { connectLinksArr } from "./const";
import BackToTopButton from "./components/BackToTopButon";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="sm:px-56 bg-background text-text">
        <Navbar />
        {children}
        <footer className="text-center w-full my-5">
          <div className="flex gap-5 justify-center items-center mb-5">
            {connectLinksArr.map(({ title, imgUrl, link }, index) => (
              <a
                href={link}
                key={index}
                target="_blank"
                rel="noopener norefferer"
              >
                <Image
                  src={imgUrl}
                  alt={title + " Icon"}
                  height={20}
                  width={20}
                />
              </a>
            ))}
          </div>
          <p>Made With 💙. Thanks for your time.</p>
        </footer>
        <BackToTopButton />
      </body>
    </html>
  );
}
