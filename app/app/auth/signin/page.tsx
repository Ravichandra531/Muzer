"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

function SignInContent() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (isLogin) {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError("Invalid credentials");
            } else {
                router.push(callbackUrl);
            }
        } else {
            try {
                const res = await axios.post("/api/auth/signup", {
                    email,
                    password,
                    name
                });
                if (res.status === 201) {
                    // Auto login after signup
                    const result = await signIn("credentials", {
                        redirect: false,
                        email,
                        password,
                    });
                    if (!result?.error) {
                        router.push(callbackUrl);
                    }
                }
            } catch (e) {
                if (axios.isAxiosError(e) && e.response?.data?.message) {
                    setError(e.response.data.message);
                } else {
                    setError("Something went wrong");
                }
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {/* Left Side - Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#0a0a0a]">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo/Brand */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            MUZER
                        </h1>
                    </div>

                    {/* Welcome Text */}
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold text-white">
                            Welcome Back
                        </h2>
                        <p className="text-neutral-400">
                            Sign in to continue to your account
                        </p>
                    </div>

                    {/* OAuth Button */}
                    <button
                        onClick={() => signIn("google", { callbackUrl })}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white text-gray-900 rounded-xl hover:bg-gray-50 transition-all font-medium shadow-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        <span>Continue with Google</span>
                    </button>


                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-[#0a0a0a] text-neutral-500 uppercase tracking-wider text-xs">
                                Or continue with email
                            </span>
                        </div>
                    </div>


                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3.5 bg-neutral-950/50 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 text-white placeholder-neutral-500 outline-none transition-all"
                                    placeholder="Enter your name"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3.5 bg-neutral-950/50 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 text-white placeholder-neutral-500 outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3.5 bg-neutral-950/50 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 text-white placeholder-neutral-500 outline-none transition-all"
                                placeholder="Enter your password"
                            />
                        </div>

                        {isLogin && (
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-purple-500 focus:ring-2 focus:ring-purple-500/30"
                                />
                                <span className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                                    Remember me
                                </span>
                            </label>
                        )}

                        {error && (
                            <div className="p-3.5 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 hover:from-purple-500 hover:via-purple-400 hover:to-pink-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLogin ? "Sign In" : "Create Account"}
                        </button>

                        <p className="text-center text-sm text-neutral-400">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </button>
                        </p>
                    </form>
                </div>
            </div>



            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}

export default function SignIn() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="text-white text-xl">Loading...</div></div>}>
            <SignInContent />
        </Suspense>
    )
}
