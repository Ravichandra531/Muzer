
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/db";
import { CONFIG } from "@/app/lib/auth";

const UpvoteSchema = z.object({
    streamId: z.string(),
});

export async function POST(req: NextRequest) {
    const session = await getServerSession(CONFIG);
    console.log("Session in UPVOTE:", session);

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email ?? "",
        },
    });

    if (!user) {
        console.log("User not found for upvote");
        return NextResponse.json(
            {
                message: "Unauthenticated"
            },
            { status: 403 }
        );
    }

    try {
        const data = UpvoteSchema.parse(await req.json());
        await prisma.upvote.create({
            data: {
                userId: user.id,
                streamId: data.streamId,
            },
        });
        return NextResponse.json({
            message: "Done!"
        })
    } catch (e) {
        console.error("Error in Upvote:", e);
        return NextResponse.json(
            { message: "Error while upvoting" },
            { status: 403 }
        );
    }
}
