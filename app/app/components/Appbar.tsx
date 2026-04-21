"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useState, useEffect } from "react"

const Appbar = () => {
  const session = useSession()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 px-4">
      <div
        className={`max-w-7xl mx-auto mt-4 px-6 py-4 rounded-2xl transition-all duration-300 backdrop-blur-xl ${
          scrolled
            ? "bg-zinc-950/70 border border-white/10"
            : "bg-zinc-950/40"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-xl font-bold tracking-tight">Muzer</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-4">
            {session.data?.user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300 hidden sm:block">
                  Hello, {session.data.user.name?.split(' ')[0]}
                </span>
                <button
                  className='rounded-xl bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/20 transition-all hover:scale-105'
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  className="relative group px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
                  onClick={() => signIn(undefined, { callbackUrl: '/' })}
                >
                  <span className="relative z-10">Login / Signup</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Appbar;