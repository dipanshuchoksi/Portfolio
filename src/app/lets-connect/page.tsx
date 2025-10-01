"use client";

import { useFormik } from "formik";
import Image from "next/image";

function LetsConnectPage() {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      subject: "",
      moreDetails: "",
    },
    onSubmit: async (values) => {
      await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold my-5">Let&apos;s Connect</h2>
      <div className="flex gap-3 mb-3">
        <Image src="./email.svg" alt="email icon" width={20} height={20} />
        <p>dipanshuchoksi@gmail.com</p>
      </div>
      <div className="flex gap-3 mb-3">
        <Image src="./phone.svg" alt="email icon" width={20} height={20} />
        <p>+91 7069619944</p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-3 w-1/2"
      >
        <div className="flex gap-3">
          <div className="w-full">
            <input
              type="email"
              placeholder="enter your email."
              className="outline-none bg-text-accent/20 px-5 py-2 rounded w-full"
              name="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="enter your name."
              className="outline-none bg-text-accent/20 px-5 py-2 rounded w-full"
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="enter your subject."
            className="outline-none bg-text-accent/20 px-5 py-2 rounded w-full"
            name="subject"
            id="subject"
            onChange={formik.handleChange}
            value={formik.values.subject}
          />
        </div>
        <div>
          <textarea
            placeholder="Share some more information."
            className="outline-none bg-text-accent/20 px-5 py-2 rounded w-full resize-none"
            name="moreDetails"
            id="moreDetails"
            onChange={formik.handleChange}
            value={formik.values.moreDetails}
            rows={10}
          />
        </div>
        <button
          type="submit"
          className="outline-none bg-positive py-3 hover:bg-positive/80 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default LetsConnectPage;
