# 🧑‍💻 Portfolio Website

A modern, responsive personal portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.
It showcases my projects, experience, and skills while also demonstrating production-grade practices like API rate limiting, email automation, and Markdown-driven content.

## 📘 About This Project

This project serves as my personal portfolio website — designed to be fast, accessible, and easy to maintain.
It includes a backend integration for contact form submissions and demonstrates how to use Upstash Redis for server-side rate limiting in a serverless environment.

### 🧩 Core Goals

- Create a performant, developer-friendly portfolio
- Experiment with Next.js App Router and edge/serverless features
- Demonstrate secure API handling and Redis-based rate limiting

---

## ⚙️ Technologies Used

| Category                 | Stack                                    |
| :----------------------- | :--------------------------------------- |
| **Languages**            | TypeScript, JavaScript                   |
| **Frontend**             | Next.js, React, Tailwind CSS             |
| **Backend**              | Nodemailer                               |
| **APIs / Communication** | REST APIs, Upstash Redis (rate limiting) |
| **Database / Cache**     | Redis (Upstash)                          |
| **Dev Tools**            | Git, ESLint, Prettier, Vercel            |

---

## ✨ Features

- ⚡ **Modern Stack:** Built using Next.js 14, TypeScript, and TailwindCSS
- 📬 **Email Integration:** Contact form sends messages via Nodemailer
- 🧠 **Rate Limiting:** Implemented with Upstash Redis + `@upstash/ratelimit`
- 🚀 **Deployment:** Hosted on Vercel with edge caching and optimized assets
- 🛡️ **XSS Protection**: Safely render HTML content using sanitization to prevent cross-site scripting

---

## 🧰 Folder Structure

```text
.
├── app/
│   ├── api/
│   │   └── email/               # Handles contact form submission
│   ├── about/                   # About page
│   ├── projects/                # Projects page
│   ├── blog/                    # Blogs page
│   ├── const/                   # All const used in website
│   ├── interface/               # Every interfaces implemented in website
│   ├── components/              # Componets of Homepage
│   ├── utils/                   # Utilities (rateLimiter, helpers)
│   └── lets-connect/            # Contact page
└── public/
     ├── icons/                  # Static icons
     └── images/                 # Other images used in website
```

---

## 🧪 Running Locally

### 1️⃣ Clone the repository

```
bash
git clone git@github.com:dipanshuchoksi/Portfolio.git
cd portfolio
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Set up environment variables

Create a .env.local file:

```
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
[SMTP_USER=your_email@gmail.com](mailto:SMTP_USER=your_email@gmail.com)
SMTP_PASSWORD=your_email_password
```

### 4️⃣ Run the development server

```
npm run dev
```

Now open http://localhost:3000

## 🌐 Deployment

Deployed using Vercel for automatic builds and serverless functions.
Each API route (like /api/email) runs in a serverless environment with Redis rate limiting.

---
