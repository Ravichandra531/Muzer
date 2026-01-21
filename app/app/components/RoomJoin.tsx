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
        <div className="mt-8 flex flex-col items-center">
            <p className="text-neutral-400 mb-2 text-sm">Have a Room ID?</p>
            <form onSubmit={handleJoin} className="flex items-center gap-2">
                <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter Room ID..."
                    className="bg-black/50 border border-neutral-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 w-64"
                />
                <button
                    type="submit"
                    disabled={!roomId.trim()}
                    className="bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    Join
                </button>
            </form>
        </div>
    );
}
