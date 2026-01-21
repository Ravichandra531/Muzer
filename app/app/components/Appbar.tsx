"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

const Appbar = () => {
  const session = useSession()
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">M</div>
              <span className="text-xl font-bold tracking-tight text-white">Muzer</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {session.data?.user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300 hidden sm:block">
                  Hello, {session.data.user.name?.split(' ')[0]}
                </span>
                <button
                  className='rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/20 transition-colors'
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  className="bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50
                  transition-all rounded-lg px-4 py-2 text-sm font-medium"
                  onClick={() => signIn(undefined, { callbackUrl: window.location.href })}
                >
                  Login / Signup
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