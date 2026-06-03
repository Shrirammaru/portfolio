# Shriram Toksiya — Portfolio

Professional portfolio for **Shriram Toksiya**, Cinematographer, Video Editor & Drone Pilot.

## Stack

- **Frontend** — Next.js 15, Tailwind CSS, Framer Motion
- **Backend** — Node.js, Express.js, Nodemailer
- **Database** — MongoDB (optional — mail works without it)

## Project Structure

```
portfolio/
├── frontend/    → Next.js app (deploy to Vercel)
└── backend/     → Express API (deploy to Railway/Render)
```

## Local Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in your values
npm run dev            # runs on :5000
```

### Frontend
```bash
cd frontend
npm install
# create .env.local with NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm run dev            # runs on :3000
```

## Deploy

### Frontend → Vercel
1. Import `frontend/` folder on [vercel.com](https://vercel.com)
2. Add env var: `NEXT_PUBLIC_API_URL=https://your-backend-url/api`

### Backend → Railway / Render
1. Import `backend/` folder
2. Add all env vars from `.env.example`
