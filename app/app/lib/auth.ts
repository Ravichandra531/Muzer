import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/app/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User, Account, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const CONFIG = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) {
                    return null;
                }

                if (!user.password) {
                    return null
                }

                const isPasswordValid = await bcrypt.compare(credentials?.password as string, user.password as string);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
//   @ts-ignore
                    name: user.name ?? user.email.split('@')[0]
                };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET ?? "secret",
    callbacks: {
        async signIn(params: { user: User; account: Account | null }) {
            if (!params.user.email) {
                return false;
            }

            if (params.account?.provider === "google") {
                try {
//   @ts-ignore
                    await prisma.user.upsert({
                        where: { email: params.user.email },
                        update: {
            //   @ts-ignore
                            name: params.user.name ?? "",
                        },
                        create: {
                            email: params.user.email,
                            //   @ts-ignore
                            name: params.user.name ?? "",
                            provider: "Google"
                        }
                    })
                } catch (e) {
                    console.error("Error during Google sign-in sync:", e);
                }
            }
            return true;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                //   @ts-ignore
                session.user.id = token.uid
            }
            return session
        },
        async jwt({ token }: { token: JWT }) {
            const dbUser = await prisma.user.findFirst({
                where: {
                    email: token.email ?? ""
                }
            })

            if (dbUser) {
                token.uid = dbUser.id
            }
            return token
        }
    },
    pages: {
        signIn: '/auth/signin'
    }
}
