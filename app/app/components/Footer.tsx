export const Footer = () => {
    return (
        <footer className="w-full bg-black/50 border-t border-white/10 py-8 px-4 mt-auto backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-xl font-bold text-white mb-2">Muzer</h2>
                    <p>© {new Date().getFullYear()} Muzer. All rights reserved.</p>
                </div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
                    <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    )
}
