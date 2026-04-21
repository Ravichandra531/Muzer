"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-zinc-950 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-zinc-950 to-zinc-950" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 scroll-reveal opacity-0 translate-y-10">
              <span className="text-sm text-indigo-300 font-medium">
                Now Streaming Worldwide
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 scroll-reveal opacity-0 translate-y-10 transition-all duration-700 delay-100">
              Let Your Audience
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Choose The Music
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10 scroll-reveal opacity-0 translate-y-10 transition-all duration-700 delay-200">
              Muzer transforms your streams into interactive experiences. Let your listeners vote on the playlist in real-time.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start scroll-reveal opacity-0 translate-y-10 transition-all duration-700 delay-300">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-105"
              >
                Start Listening
              </Link>
              <Link
                href="#how-it-works"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative scroll-reveal opacity-0 translate-y-10 transition-all duration-700 delay-400">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8">
              <img
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop"
                alt="Music streaming interface"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Now Playing</p>
                    <p className="text-xs text-gray-400">2.5K listeners</p>
                  </div>
                </div>
              </div>
              {/* Vote badge */}
              <div className="absolute -top-4 -right-4 bg-indigo-500 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm">
                +256 votes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Three simple steps to interactive music streaming
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Create Your Room",
                description: "Set up your streaming room in seconds. Customize your settings and you're ready to go.",
              },
              {
                number: "02",
                title: "Share With Fans",
                description: "Invite your audience with a simple link. They join instantly, no downloads required.",
              },
              {
                number: "03",
                title: "Let Them Vote",
                description: "Your audience votes on what plays next. The music evolves with your community's taste.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="scroll-reveal opacity-0 translate-y-10 transition-all duration-700 p-8 rounded-2xl bg-zinc-950/50 border border-white/5 hover:border-indigo-500/20 hover:bg-zinc-950 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-6xl font-bold text-white/10 mb-4">
                  {item.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Features designed for
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                creators
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Real-time Voting",
                description: "Listeners vote on the next song. The highest voted track plays next automatically.",
              },
              {
                title: "High Quality Audio",
                description: "Stream in crystal clear high definition quality for the best listening experience.",
              },
              {
                title: "Live Analytics",
                description: "Track engagement, popular songs, and listener demographics in real-time.",
              },
              {
                title: "Seamless Integration",
                description: "Works with your favorite streaming platforms. Connect once and start engaging.",
              },
              {
                title: "Custom Branding",
                description: "Make it yours with custom themes, colors, and branding for your stream.",
              },
              {
                title: "Community Chat",
                description: "Built-in chat lets your audience discuss and discover music together.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="scroll-reveal opacity-0 translate-y-10 transition-all duration-700 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/20 hover:bg-white/10 group"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Active Listeners" },
              { value: "2000+", label: "Creators" },
              { value: "1M+", label: "Votes Cast" },
              { value: "99%", label: "Uptime" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center scroll-reveal opacity-0 translate-y-10 transition-all duration-700"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by creators worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Muzer completely changed how I interact with my audience. The engagement is through the roof and my streams feel more alive than ever.",
                name: "Sarah Chen",
                role: "DJ & Music Producer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
              },
              {
                quote: "The real-time voting feature is genius. My community loves having a say in what plays next. It's become a core part of my brand.",
                name: "Marcus Rivera",
                role: "Twitch Streamer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="scroll-reveal opacity-0 translate-y-10 transition-all duration-700 p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/20"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/20"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-zinc-950 via-indigo-950/20 to-zinc-950">
        <div className="max-w-4xl mx-auto text-center scroll-reveal opacity-0 translate-y-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to transform your streams?
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of creators who are engaging their audience in a whole new way. Start your interactive music journey today.
          </p>
          <Link
            href="/auth/signin"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
