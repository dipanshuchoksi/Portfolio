"use client";

import { useFormik } from "formik";
import Image from "next/image";
import { useState } from "react";
import * as yup from "yup";
import Toast from "../components/toast";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("please enter valid email.")
    .required("email input field is empty."),
  name: yup.string().required("name input field is empty"),
  subject: yup.string().required("subject input field is empty."),
  moreDetails: yup.string().required("more details field is empty."),
});

function LetsConnectPage() {
  // tracks errors that may occur during the process of api call.
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    msg: string;
    type: "loading" | "idle" | "error" | "success";
  }>({ msg: "", type: "idle" });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      subject: "",
      moreDetails: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError("");
        setToast({
          msg: "Sending an email. Wait for confirmation.",
          type: "loading",
        });
        const response = await fetch("/api/email", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (!data.success) {
          throw new Error("failed to send message.");
        }

        formik.resetForm();
        setToast({ msg: "Email sent successfully.", type: "success" });
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to send message"
        );
        setToast({
          msg: "error while sending an email. please try again.",
          type: "error",
        });
      }
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
        className="flex flex-col gap-3 max-w-[41rem] min-w-[20rem]"
      >
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 shrink-0 basis-[18rem]">
            <input
              type="email"
              placeholder="enter your email."
              className="outline-none bg-text-accent/20 px-5 py-2 rounded w-full"
              name="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="bg-red-600 px-2 py-1 rounded w-fit mt-1 text-sm">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="flex-1 shrink-0 basis-[18rem]">
            <input
              type="text"
              placeholder="enter your name."
              className="outline-none bg-text-accent/20 px-5 py-2 rounded w-full"
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="bg-red-600 px-2 py-1 rounded w-fit mt-1 text-sm">
                {formik.errors.name}
              </div>
            ) : null}
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
            onBlur={formik.handleBlur}
          />
          {formik.touched.subject && formik.errors.subject ? (
            <div className="bg-red-600 px-2 py-1 rounded w-fit mt-1 text-sm">
              {formik.errors.subject}
            </div>
          ) : null}
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
            onBlur={formik.handleBlur}
          />
          {formik.touched.moreDetails && formik.errors.moreDetails ? (
            <div className="bg-red-600 px-2 py-1 rounded w-fit mt-1 text-sm">
              {formik.errors.moreDetails}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="outline-none bg-positive py-3 hover:bg-positive/80 cursor-pointer"
        >
          Submit
        </button>
        {error.length == 0 ? null : (
          <div className="bg-red-600 px-2 py-1 rounded w-fit mt-1">
            Error : {error}
          </div>
        )}
      </form>

      {toast.type != "idle" && (
        <Toast
          msg={toast.msg}
          onClose={() => setToast({ msg: "", type: "idle" })}
          type={toast.type}
        />
      )}
    </div>
  );
}

export default LetsConnectPage;
