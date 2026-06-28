# Practo Clone — Complete Setup & Vercel Deployment Guide

## 📁 Project Structure

```
practo-clone/
├── pages/
│   ├── _app.js                  # App wrapper (global CSS)
│   ├── index.js                 # Homepage
│   ├── doctors.js               # Doctor search & listing
│   ├── doctors/[id].js          # Doctor profile page
│   ├── book/[id].js             # Book appointment page
│   ├── tests.js                 # Lab tests page
│   ├── video-consult.js         # Video consultation page
│   ├── articles.js              # Health articles
│   ├── login.js                 # Login (OTP demo)
│   ├── signup.js                # Sign up
│   └── api/
│       ├── doctors.js           # GET /api/doctors (search & filter)
│       ├── doctors/[id].js      # GET /api/doctors/:id
│       ├── bookings.js          # POST/GET /api/bookings
│       ├── tests.js             # GET/POST /api/tests
│       └── articles.js          # GET /api/articles
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   └── DoctorCard.js
├── data/
│   └── mockData.js              # All mock data (doctors, tests, articles)
├── styles/
│   └── globals.css
├── package.json
├── next.config.js
└── .gitignore
```

---

## 🚀 Step 1 — Local Setup

### Prerequisites
- **Node.js** v18+ → https://nodejs.org
- **Git** → https://git-scm.com
- A **Vercel account** → https://vercel.com (free)
- A **GitHub account** → https://github.com (free)

### Install & Run Locally

```bash
# 1. Navigate into the project folder
cd practo-clone

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in your browser
# http://localhost:3000
```

---

## 🌐 API Routes Reference

All backend routes are built into Next.js (no separate server needed).

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| GET    | `/api/doctors`          | List all doctors                   |
| GET    | `/api/doctors?search=X` | Search doctors by name/specialty   |
| GET    | `/api/doctors?specialty=X` | Filter by specialty             |
| GET    | `/api/doctors?available=true` | Only available doctors       |
| GET    | `/api/doctors/:id`      | Get single doctor profile          |
| POST   | `/api/bookings`         | Book an appointment                |
| GET    | `/api/bookings?phone=X` | Get bookings by phone number       |
| GET    | `/api/tests`            | List all lab tests                  |
| POST   | `/api/tests`            | Book a lab test                    |
| GET    | `/api/articles`         | List all health articles           |

### Example: Book an Appointment (POST /api/bookings)

```json
{
  "doctorId": 1,
  "doctorName": "Dr. Priya Sharma",
  "specialty": "General Physician",
  "patientName": "Rahul Verma",
  "patientPhone": "9876543210",
  "date": "2026-07-10",
  "time": "10:00 AM"
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "id": 1,
    "bookingRef": "PRC1719500000000",
    "status": "confirmed",
    ...
  }
}
```

---

## ☁️ Step 2 — Deploy to Vercel

### Option A — Vercel CLI (Fastest)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Inside your project folder
cd practo-clone

# 3. Login to Vercel
vercel login

# 4. Deploy!
vercel

# Follow prompts:
# ? Set up and deploy? → Yes
# ? Which scope? → Your account
# ? Link to existing project? → No
# ? What's your project's name? → practo-clone
# ? In which directory is your code? → ./
# ? Override settings? → No

# 5. For production deployment
vercel --prod
```

Your site will be live at: `https://practo-clone-xxx.vercel.app`

---

### Option B — GitHub + Vercel Dashboard (Recommended)

#### Step 1: Push to GitHub

```bash
# Inside the practo-clone folder
git init
git add .
git commit -m "Initial commit: Practo clone with mock backend"

# Create a new repo on GitHub (https://github.com/new)
# Then connect it:
git remote add origin https://github.com/YOUR_USERNAME/practo-clone.git
git branch -M main
git push -u origin main
```

#### Step 2: Import on Vercel

1. Go to → https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your `practo-clone` repo
4. Configure:
   - **Framework Preset:** Next.js (auto-detected ✓)
   - **Build Command:** `next build` (auto-filled ✓)
   - **Output Directory:** `.next` (auto-filled ✓)
5. Click **"Deploy"**

**Done! 🎉** Your app is live in ~60 seconds.

---

## 🔄 Step 3 — Automatic Deployments

After connecting GitHub to Vercel, every `git push` auto-deploys:

```bash
# Make a change, then:
git add .
git commit -m "Update homepage banner"
git push

# Vercel automatically deploys the new version!
```

---

## 🗄️ Step 4 — Connect a Real Database (Optional Upgrade)

The mock backend stores data in memory (resets on server restart).
To persist data, connect a real database.

### Option A: PostgreSQL with Neon (Free tier)

```bash
# 1. Create free DB at https://neon.tech

# 2. Install Prisma
npm install prisma @prisma/client
npm install pg

# 3. Initialize Prisma
npx prisma init
```

Update `prisma/schema.prisma`:
```prisma
model Doctor {
  id          Int      @id @default(autoincrement())
  name        String
  specialty   String
  experience  Int
  rating      Float
  fee         Int
  available   Boolean
  location    String
}

model Booking {
  id           Int      @id @default(autoincrement())
  doctorId     Int
  patientName  String
  patientPhone String
  date         String
  time         String
  status       String   @default("confirmed")
  bookingRef   String
  createdAt    DateTime @default(now())
}
```

```bash
# 4. Push schema to database
npx prisma db push

# 5. Generate Prisma client
npx prisma generate
```

Then replace mock data calls in API routes with Prisma queries:
```javascript
// pages/api/doctors.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const doctors = await prisma.doctor.findMany();
  res.json({ doctors });
}
```

### Option B: MongoDB with Atlas (Free tier)

```bash
# 1. Create free cluster at https://mongodb.com/atlas

# 2. Install Mongoose
npm install mongoose

# 3. Create lib/mongodb.js
```

```javascript
// lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  cached.promise = mongoose.connect(MONGODB_URI);
  cached.conn = await cached.promise;
  return cached.conn;
}
```

---

## 🔐 Step 5 — Environment Variables

For secrets (DB passwords, API keys), use `.env.local` locally and Vercel's dashboard for production.

```bash
# .env.local (never commit this file!)
DATABASE_URL=postgresql://user:password@host/dbname
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/practo
NEXTAUTH_SECRET=your-random-secret-string
NEXTAUTH_URL=http://localhost:3000
```

**Add to Vercel:**
1. Go to your project on https://vercel.com
2. Settings → Environment Variables
3. Add each variable from `.env.local`
4. Redeploy

---

## 🔑 Step 6 — Add Real Authentication (Optional)

Replace demo OTP with NextAuth.js:

```bash
npm install next-auth
```

```javascript
// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Phone OTP",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        // Verify OTP here (e.g. via Twilio / MSG91)
        if (credentials.otp === "1234") { // demo
          return { id: 1, phone: credentials.phone };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
```

---

## 📱 Pages Overview

| Route              | Description                              |
|--------------------|------------------------------------------|
| `/`                | Homepage with hero, specialties, stats   |
| `/doctors`         | Doctor search with filters               |
| `/doctors/:id`     | Doctor profile page                      |
| `/book/:id`        | Book appointment (with confirmation)     |
| `/video-consult`   | Video consultation categories            |
| `/tests`           | Lab tests with booking modal             |
| `/articles`        | Health articles feed                     |
| `/login`           | Phone OTP login (demo: OTP = 1234)       |
| `/signup`          | New user registration                    |

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js 14, React 18                |
| Backend    | Next.js API Routes (serverless)     |
| Styling    | CSS Modules + inline styles         |
| Data       | Mock data (in-memory) / upgradeable |
| Hosting    | Vercel (free tier)                  |
| Database   | Neon PostgreSQL or MongoDB Atlas    |

---

## ✅ Deployment Checklist

- [ ] `npm install` — dependencies installed
- [ ] `npm run dev` — runs without errors locally
- [ ] `npm run build` — production build succeeds
- [ ] GitHub repo created and code pushed
- [ ] Vercel project imported from GitHub
- [ ] Environment variables added to Vercel (if using real DB)
- [ ] Custom domain configured (optional — Vercel Settings → Domains)
- [ ] Site is live! 🎉

---

## 💡 Tips

- **Free tier limits**: Vercel free tier allows 100GB bandwidth/month, 100 serverless function invocations/day
- **In-memory data**: The mock backend resets whenever the serverless function cold-starts. Connect a real database for persistence.
- **Custom domain**: You can add a custom domain (e.g. `myapp.com`) in Vercel → Settings → Domains
- **Performance**: Next.js has built-in image optimization, code splitting, and edge caching — your app will be fast out of the box.
