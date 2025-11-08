# Project setup Guide

This is template file for project setup using

- Nextjs
- JavaScript
- Prisma
- Sqlite
- shadcn
- tailwindcss

## 👉 Start

### 🚀 Create nextjs project with this

```pnpm
pnpm create next-app@latest
```

### 🐇... Initialize github repo and add to project

Go to add remote - enter git url - name the project - commit and push

### Add Shadcn

This command will add shadcn to our project. It will create components folder then add required components in it.

```pnpm
pnpm dlx shadcn@latest add button
```

### Complete home page and layout page setup

Home.js page

```js
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      Home Page
    </div>
  );
}
```

Layout.js page

```js
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next App Setup",
  description: "Next.js project setup with Prisma and SQLite and better auth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

## 👉 Prisma

### Add prisma

Add prisma as dev dependency.

```pnpm
pnpm install prisma --save-dev
```

Check prisma CLI

```npx
pnpm dlx prisma
```

#### Add prisma for Sqlite

```pnpm
pnpm dlx prisma init --datasource-provider sqlite --output ../lib/generated/prisma
```

#### Add prisma for Postgress

```pnpm
pnpm dlx prisma init --datasource-provider postgresql --output ../lib/generated/prisma
```

#### Add dotenv and update prisma.config.ts

```pnpm
pnpm add dotenv
```

prisma.config.ts

```ts
import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

Now go to add better auth in our project and then come back to below step

#### Run prisma db push

```pnpm
pnpm dlx prisma db pull
```

## 👉 Setup .env variables

#### Sqlite Database URL

```js
DATABASE_URL = "file:./dev.db";
```

#### Postgress Database URL

```js
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

```js
DATABASE_URL =
  "postgresql://postgres:0807@localhost:5433/better_auth_db?schema=public";
```

#### Better Auth env varriables

```js
BETTER_AUTH_BASE_URL = "http://localhost:3000";
```

```js
BETTER_AUTH_SECRET = "secrete-code";
```

#### Resent api key

```js
RESEND_API_KEY = "";
```

## 👉 Add Better auth

To add better auth

```pnpm
pnpm add better-auth
```

Add better auth secrete inside .env file

```js
BETTER_AUTH_SECRET = mXisfTmjHEHaExkLGORoMO5xaiFpq4uu;
```

Add base URL inside .env file as

```js
BETTER_AUTH_URL=http://localhost:3000 # Base URL of your app
```
