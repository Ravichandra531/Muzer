# 🎵 Muzer

**Muzer** is an interactive music streaming platform where your audience gets to vote on what plays next. Built for creators who want to turn their streams into a real-time, community-driven music experience.

---

## ✨ Features

- 🗳️ **Real-time Voting** — Listeners vote on the next song; the highest-voted track plays automatically
- 🎧 **YouTube Integration** — Add any YouTube video to the queue via link
- 🚀 **Room System** — Creators host rooms; fans join with a Room ID
- 🔐 **Authentication** — Google OAuth and email/password sign-in via NextAuth
- 📊 **Live Queue** — Upcoming songs update in real-time with vote counts
- 📋 **Share Room ID** — One-click copy to invite your audience
- 🎨 **Indigo/Purple Theme** — Clean, modern dark UI built with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | NextAuth.js v4 |
| Database | PostgreSQL |
| ORM | Prisma v7 |
| HTTP Client | Axios |
| Video Player | react-youtube |
| Validation | Zod |
| Notifications | react-toastify |

---

## 📁 Project Structure

```
app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/   # NextAuth handler
│   │   │   └── signup/          # Email signup endpoint
│   │   └── streams/
│   │       ├── route.ts         # GET/POST streams
│   │       ├── upvote/          # Upvote a stream
│   │       ├── downvote/        # Downvote a stream
│   │       └── next/            # Play next stream
│   ├── auth/
│   │   └── signin/              # Login & signup page
│   ├── components/
│   │   ├── Appbar.tsx           # Navbar with nav links
│   │   ├── ConditionalNav.tsx   # Hides navbar on dashboard/creator
│   │   ├── StreamView.tsx       # Main stream player + queue UI
│   │   ├── RoomJoin.tsx         # Join room by ID
│   │   ├── Footer.tsx
│   │   └── Redirect.tsx
│   ├── creator/[creatorId]/     # Viewer page for a creator's room
│   ├── dashboard/               # Room lobby (create or join)
│   ├── lib/
│   │   ├── auth.ts              # NextAuth config
│   │   └── db.ts                # Prisma client
│   ├── layout.tsx
│   ├── page.tsx                 # Landing page
│   └── provider.tsx             # Session provider
├── prisma/
│   └── schema.prisma            # Database schema
└── public/
```

---

## 🗄️ Database Schema

- **User** — Stores user accounts (Google or Credentials)
- **Stream** — YouTube videos added to a creator's queue
- **Upvote** — Tracks which user upvoted which stream (unique per user/stream)
- **CurrentStream** — Tracks the currently playing stream per creator

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google OAuth credentials (for Google sign-in)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/muzer.git
cd muzer/app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `app/` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/muzer"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 How It Works

1. **Sign up / Log in** — Create an account with email or Google
2. **Create a Room** — Go to the dashboard and create your room
3. **Share your Room ID** — Copy and share it with your audience
4. **Add Songs** — Paste a YouTube link to add it to the queue
5. **Audience Votes** — Viewers join and upvote their favourite songs
6. **Play Next** — The creator plays the top-voted song next

---

## 📜 Scripts

```bash
npm run dev          # Start development server
npm run build        # Generate Prisma client + build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License — feel free to use and modify for your own projects.

---

> Built with ❤️ using Next.js, Prisma, and Tailwind CSS
