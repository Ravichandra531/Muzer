"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

const Appbar = () => {
  const session = useSession()
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0a0a0a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/20">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Muzer</span>
            </Link>
          </div>

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
                  className="relative group px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
                  onClick={() => signIn(undefined, { callbackUrl: '/' })}
                >
                  <span className="relative z-10">Login / Signup</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Appbar;