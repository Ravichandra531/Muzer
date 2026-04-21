"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RoomJoin() {
    const [roomId, setRoomId] = useState("");
    const router = useRouter();

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();
        if (roomId.trim()) {
            router.push(`/creator/${roomId}`);
        }
    };

    return (
        <div className="mt-6 sm:mt-8 flex flex-col items-center w-full">
            <p className="text-gray-400 mb-2 text-sm">Have a Room ID?</p>
            <form onSubmit={handleJoin} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter Room ID..."
                    className="bg-zinc-950/50 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 w-full sm:w-64"
                />
                <button
                    type="submit"
                    disabled={!roomId.trim()}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-all w-full sm:w-auto"
                >
                    Join
                </button>
            </form>
        </div>
    );
}
