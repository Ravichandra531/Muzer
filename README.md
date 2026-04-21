# Muzer 🎵

Muzer is a collaborative music streaming platform that allows users to create music rooms where everyone can influence the playlist. Built with Next.js, Prisma, and the YouTube API, Muzer brings a democratic approach to music listening.

![Muzer Logo](app/public/logo.png) <!-- Replace with actual banner if available -->

## 🚀 Features

- **Collaborative Queue**: Anyone in the room can search and add YouTube videos to the stream.
- **Democratic Voting**: Upvote your favorite tracks. The song with the most votes plays next!
- **Real-time Synchronization**: Everyone in the room hears the same track at the same time.
- **Host Controls**: Room creators have full control over the playback and queue management.
- **Multiple Providers**: Support for YouTube (and extendable to Spotify).
- **Secure Authentication**: Integration with NextAuth for Google and Credential-based logins.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **API**: [YouTube Data API v3](https://developers.google.com/youtube/v3)
- **Deployment**: Optimized for [Vercel](https://vercel.com/)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- YouTube API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ravichandra531/Muzer.git
   cd Muzer/app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the `app` directory and add the following:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/muzer"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   YOUTUBE_API_KEY="your-youtube-api-key"
   ```

4. **Database Migration:**
   ```bash
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
Muzer/
├── app/
│   ├── app/                # Next.js App Router (Pages & API)
│   ├── components/         # Reusable React components
│   ├── prisma/            # Database schema and migrations
│   ├── public/             # Static assets
│   └── ...                 # Config files (Tailwind, TypeScript, etc.)
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or want to add new features:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
Built with ❤️ by [Ravichandra Shinde](https://github.com/Ravichandra531)
