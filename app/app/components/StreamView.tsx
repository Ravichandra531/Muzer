
"use client"
import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import YouTube from "react-youtube"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Stream = {
    id: string
    type: string
    url: string
    extractedId: string
    title: string
    smallImg: string
    bigImg: string
    active: boolean
    upvotes: number
    haveUpvoted: boolean
    addedBy: string
}

const REFRESH_INTERVAL_MS = 10 * 1000;

export default function StreamView({
    creatorId,
    isCreator = false
}: {
    creatorId: string,
    isCreator?: boolean
}) {
    const [streams, setStreams] = useState<Stream[]>([])
    const [activeStream, setActiveStream] = useState<Stream | null>(null)
    const [loading, setLoading] = useState(false)
    const [inputLink, setInputLink] = useState("")

    const refreshStreams = useCallback(async () => {
        if (!creatorId) return;

        // Fetch streams for the specific creator
        try {
            const res = await axios.get(`/api/streams?creatorId=${creatorId}`);
            setStreams(res.data.streams.sort((a: Stream, b: Stream) => b.upvotes - a.upvotes));
            setActiveStream(res.data.activeStream || null);
        } catch { /* ignore */ }
    }, [creatorId]);

    async function playNext() {
        if (!isCreator) return;
        try {
            await axios.post('/api/streams/next');
            refreshStreams();
        } catch (e) {
            console.error("Play next failed", e);
        }
    }

    useEffect(() => {
        refreshStreams();
        const interval = setInterval(refreshStreams, REFRESH_INTERVAL_MS)
        return () => clearInterval(interval)
    }, [refreshStreams, creatorId])

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <ToastContainer position="bottom-right" theme="dark" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left/Top: Video Player & Input */}
                <div className="space-y-6">
                    <div className="bg-neutral-900 rounded-xl overflow-hidden aspect-video border border-neutral-800 shadow-xl relative">
                        {activeStream ? (
                            <div className={`w-full h-full ${!isCreator ? "pointer-events-none" : ""}`}>
                                <YouTube
                                    videoId={activeStream.extractedId}
                                    opts={{
                                        width: '100%',
                                        height: '100%',
                                        playerVars: {
                                            autoplay: 1,
                                            controls: isCreator ? 1 : 0,
                                            modestbranding: 1,
                                            rel: 0,
                                            showinfo: 0,
                                        }
                                    }}
                                    className="w-full h-full"
                                    iframeClassName="w-full h-full border-0"
                                    onEnd={() => {
                                        if (isCreator) {
                                            playNext();
                                        }
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 gap-4">
                                <span>No active stream</span>
                                {isCreator && streams.length > 0 && (
                                    <button
                                        onClick={playNext}
                                        className="bg-purple-600 px-4 py-2 text-white rounded-lg hover:bg-purple-700 transition"
                                    >
                                        Play Next
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Controls specific for Creator */}
                    {isCreator && (
                        <div className="flex gap-4">
                            <button
                                onClick={playNext}
                                className="bg-blue-600 px-4 py-2 text-white rounded-lg hover:bg-blue-700 transition font-bold"
                            >
                                Play Next
                            </button>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(creatorId);
                                    toast.success("Room ID Copied!");
                                }}
                                className="bg-green-600 px-4 py-2 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                </svg>
                                Share Room ID
                            </button>
                        </div>
                    )}

                    {/* input section */}
                    <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800">
                        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Add a Song</h2>
                        <div className="flex gap-2 flex-col sm:flex-row">
                            <input
                                type="text"
                                placeholder="Paste YouTube Link..."
                                className="flex-1 bg-black border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                value={inputLink}
                                onChange={(e) => setInputLink(e.target.value)}
                            />
                            <button
                                disabled={loading}
                                onClick={async () => {
                                    setLoading(true)
                                    try {
                                        await axios.post('/api/streams', {
                                            creatorId: creatorId,
                                            url: inputLink
                                        })
                                        setInputLink("")
                                        refreshStreams()
                                        toast.success("Song added to queue!")
                                    } catch (e) {
                                        if (axios.isAxiosError(e)) {
                                            const errorMsg = e.response?.data?.message || "Error adding song";
                                            toast.error(errorMsg);
                                            console.error("API Error:", {
                                                status: e.response?.status,
                                                data: e.response?.data
                                            });
                                        } else {
                                            toast.error("Error adding song");
                                            console.error("Unexpected Error:", e);
                                        }
                                    } finally {
                                        setLoading(false)
                                    }
                                }}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-all disabled:opacity-50"
                            >
                                {loading ? "Adding..." : "Add to Queue"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right/Bottom: Queue */ }
                <div className="bg-neutral-900/30 rounded-xl border border-neutral-800 p-6 flex flex-col h-full max-h-[800px]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            Upcoming Songs
                            <span className="text-sm font-normal text-neutral-500 bg-neutral-800 px-2 py-1 rounded-full">{streams.length}</span>
                        </h2>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                        {streams.length === 0 && (
                            <div className="text-neutral-500 text-center py-10">
                                Queue is empty. Add a song to get the party started!
                            </div>
                        )}

                        {streams.map((stream) => (
                            <div key={stream.id} className="flex items-center gap-4 bg-black/40 p-3 rounded-xl border border-neutral-800/50 hover:border-neutral-700 transition-all group">
                                <div className="relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden">
                                    <img src={stream.smallImg} alt={stream.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-white truncate group-hover:text-purple-400 transition-colors">{stream.title}</h3>
                                    <p className="text-sm text-neutral-500 truncate">Requested by {stream.addedBy}</p>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <button
                                        onClick={async () => {
                                            await axios.post(`/api/streams/${stream.haveUpvoted ? 'downvote' : 'upvote'}`, {
                                                streamId: stream.id
                                            })
                                            refreshStreams()
                                        }}
                                        className={`p-2 rounded-lg transition-colors flex flex-col items-center ${stream.haveUpvoted ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                        </svg>
                                    </button>
                                    <span className="text-sm font-bold">{stream.upvotes}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
