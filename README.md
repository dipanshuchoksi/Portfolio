# Portfolio

A fast, elegant personal site to showcase who I am, what I build, and what I know.  
Built with **Next.js 14**, **TypeScript**, **shadcn/ui**, and **MongoDB**. Deployed on **Vercel**.

> Performance first. Developer-friendly. Full-stack capabilities.

<p align="left">
  <a href="https://nextjs.org/"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs"></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white"></a>
  <a href="https://ui.shadcn.com/"><img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn/ui-Components-000?logo=radixui"></a>
  <a href="https://www.mongodb.com/"><img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb"></a>
  <a href="https://aws.amazon.com/s3/"><img alt="AWS S3" src="https://img.shields.io/badge/AWS_S3-Storage-569A31?logo=amazons3"></a>
  <a href="https://vercel.com/"><img alt="Vercel" src="https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel"></a>
</p>

---

## Why this exists

I wanted a portfolio that feels **modern**, loads **instantly**, and is **fun to build on**. Most importantly, it includes a robust backend that allows me to manage my content seamlessly without touching code.

---

## Core Capabilities

- **Lightning-fast public portfolio** with clean architecture
- **Admin Dashboard**: Secure login area to create, edit, and delete Projects, Archive entries, and Resume.
- **Dynamic Data**: Powered by MongoDB (Mongoose) and Next.js Server Actions.
- **Media Storage**: Direct uploads of images and resume PDFs to AWS S3.
- **Theme toggle**: Persistent Dark / Light mode support.

---

## Tech Stack

| Category      | Stack                                     |
| :------------ | :---------------------------------------- |
| **Languages** | TypeScript                                |
| **Frontend**  | Next.js, React, shadcn/ui, Tailwind CSS   |
| **Backend**   | Next.js Server Actions, MongoDB, Mongoose |
| **Storage**   | AWS S3 (@aws-sdk/client-s3)               |
| **Dev Tools** | Git, ESLint, Vercel                       |

---

## Features at a glance

- **Next.js 14 App Router** with file-based routing and Server Actions.
- **Accessible UI** powered by **shadcn/ui** + **Radix** primitives.
- **Responsive design** from mobile → ultrawide.
- **Admin Authentication** with JWT/Cookie-based session management.
- **S3 File Management** for dynamic image rendering and resume downloads.
- **Type-safe** across the entire stack.

---

## Project Structure

```text
├── app                       # Routes & pages (App Router)
│ ├── (main)                  # Public-facing portfolio pages
│ ├── admin                   # Admin dashboard and content management
│ ├── actions                 # Next.js Server Actions (db mutations, uploads, auth)
│ └── api                     # API routes (e.g., streaming resume/images from S3)
│
├── components                # UI & layout components
│ ├── ui                      # Reusable shadcn/ui wrappers
│ └── ...                     # Feature components (ProjectEditor, AdminHeader, etc.)
│
├── lib                       # Utilities (db connection, S3 client)
├── models                    # Mongoose database schemas (Project, Note)
├── hooks                     # Custom React hooks (useAuthStatus)
├── public                    # Static assets
└── styles                    # Global styles (Tailwind CSS)
```

## Local Development

Clone the repository, install dependencies, and set up your `.env` file with MongoDB and AWS credentials.

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env.local` file with the following variables:

   ```env
   DB_URI=your_mongodb_connection_string
   ADMIN_EMAIL=your_admin_email
   GITHUB_ID=your_github_id
   GITHUB_SECRET=your_github_secret
   AWS_ACCESS_KEY_ID=your_aws_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret
   AWS_REGION=your_aws_region
   AWS_S3_BUCKET_NAME=your_bucket_name
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

Then visit [http://localhost:3000](http://localhost:3000) to view the public site, and `/login` to access the admin portal.
