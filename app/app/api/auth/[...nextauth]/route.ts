import NextAuth from "next-auth"
import { CONFIG } from "@/app/lib/auth"; 

const handler = NextAuth(CONFIG)

export { handler as GET, handler as POST }