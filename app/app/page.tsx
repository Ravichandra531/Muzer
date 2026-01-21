import Link from "next/link";
import { getServerSession } from "next-auth";
import { CONFIG } from "@/app/lib/auth";

export default async function Home() {
  const session = await getServerSession(CONFIG);
  const redirectUrl = session?.user ? "/dashboard" : "/auth/signin";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-purple-500/30">

      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 text-center">

        <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-neutral-950 to-neutral-950" />
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-pink-600/20 blur-[100px]" />

        <h1 className="animate-fade-in-up bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl md:text-8xl">
          Let Your Audience <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text">Choose The Music</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-neutral-400 sm:text-xl">
          Muzer transforms your streams into interactive experiences. Let your listeners vote on the playlist in real-time.
        </p>


        <div className="mt-10 flex flex-col gap-4 sm:flex-row items-center justify-center">
          <Link href={redirectUrl} className="group relative overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-neutral-200">
            <span className="relative z-10">Start Listening</span>
            <div className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-purple-400 to-pink-600 transition-transform group-hover:translate-y-0" />
          </Link>
        </div>
      </section>

      
      <section className="container mx-auto px-4 py-24">
        <h2 className="mb-16 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Features designed for <span className="text-purple-500">creators</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {[
            {
              title: "Real-time Voting",
              description: "Listeners vote on the next song. The highest voted track plays next automatically.",
              icon: "🎵"
            },
            {
              title: "High Quality Audio",
              description: "Stream in crystal clear high definition quality for the best experience.",
              icon: "🎧"
            }
          ].map((feature, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 transition-all hover:-translate-y-1 hover:border-purple-500/50 hover:bg-neutral-900">
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-neutral-400">{feature.description}</p>
              <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl transition-all group-hover:bg-purple-500/20" />
            </div>
          ))}
        </div>
      </section>


      <section className="border-t border-neutral-800 bg-neutral-900/30 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">Ready to transform your streams?</h2>
          <p className="mx-auto mb-10 max-w-xl text-neutral-400">Join thousands of creators who are engaging their audience in a whole new way.</p>
          <Link href="/auth/signin" className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-bold text-white shadow-lg shadow-purple-900/20 transition-all hover:scale-105 hover:shadow-purple-900/40">
            Join Muzer Now
          </Link>
        </div>
      </section>
    </div>
  );
}
