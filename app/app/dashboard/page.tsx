"use client"
import StreamView from "@/app/components/StreamView"
import RoomJoin from "@/app/components/RoomJoin"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Component() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const creatorId = (session?.user as { id?: string })?.id;
    const [view, setView] = useState<'lobby' | 'creator'>('lobby');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    if (status === 'loading' || !creatorId) {
        return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>
    }

    if (view === 'creator') {
        return (
            <div className="min-h-screen bg-[#0a0a0a]">
                <StreamView creatorId={creatorId} isCreator={true} />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
                {/* Create Room Card */}
                <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl hover:border-purple-500/50 transition-all group cursor-pointer flex flex-col items-center text-center"
                    onClick={() => setView('creator')}
                >
                    <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600/30 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Create a Room</h2>
                    <p className="text-neutral-400">Start your own voting stream and invite your audience.</p>
                </div>

                {/* Join Room Card */}
                <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Join a Room</h2>
                    <div className="w-full">
                        <RoomJoin />
                    </div>
                </div>
            </div>
        </div>
    )
}
