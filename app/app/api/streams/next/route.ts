
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { CONFIG } from "@/app/lib/auth";

export async function POST() {
    const session = await getServerSession(CONFIG);
    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    });

    if (!user) {
        return NextResponse.json({
            message: "Unauthenticated"
        }, { status: 403 })
    }

    const mostUpvotedStream = await prisma.stream.findFirst({
        where: {
            userId: user.id,
            active: true
        },
        orderBy: {
            upvotes: {
                _count: 'desc'
            }
        }
    });

    if (!mostUpvotedStream) {
        return NextResponse.json({
            message: "No streams in queue"
        }, { status: 411 })
    }

    await Promise.all([
        prisma.currentStream.upsert({
            where: {
                userId: user.id
            },
            update: {
                streamId: mostUpvotedStream.id
            },
            create: {
                userId: user.id,
                streamId: mostUpvotedStream.id
            }
        }),
        prisma.stream.update({
            where: {
                id: mostUpvotedStream.id
            },
            data: {
                active: false
            }
        })
    ]);

    return NextResponse.json({
        stream: mostUpvotedStream
    })
}
