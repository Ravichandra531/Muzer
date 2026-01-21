import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { CONFIG } from "@/app/lib/auth";


const YT_REGEX = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[\?&]\S*)?$/;

const createStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(CONFIG);
    console.log("Stream POST Session:", JSON.stringify(session, null, 2));

    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email ?? ""
      }
    });

    if (!user) {
      console.log("User not found in Stream POST. Email:", session?.user?.email);
      return NextResponse.json({
        message: "Unauthenticated"
      }, { status: 403 })
    }

    const body = await req.json();
    console.log("Stream POST Body:", JSON.stringify(body, null, 2));

    const data = createStreamSchema.parse({
      ...body,
      creatorId: body.creatorId?.trim?.(),
      url: body.url?.trim?.()
    });
    console.log("Parsed Stream Data:", JSON.stringify(data, null, 2));

    const match = data.url.match(YT_REGEX);

    if (!match) {
      return NextResponse.json(
        { message: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const extractedId = match[1];

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const recentStreamsCount = await prisma.stream.count({
      where: {
        addedById: user.id,
        createdAt: {
          gt: tenMinutesAgo
        }
      }
    })

    if (recentStreamsCount >= 3) {
      return NextResponse.json({
        message: "Rate limit exceeded. You can only add 3 songs every 10 minutes."
      }, {
        status: 429
      })
    }

    const youTubeApiResponse = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${extractedId}&format=json`
    );

    if (!youTubeApiResponse.ok) {
      return NextResponse.json(
        { message: "Error fetching video details from YouTube" },
        { status: 400 }
      );
    }

    const res = await youTubeApiResponse.json();

    const queueLength = await prisma.stream.count({
      where: {
        userId: data.creatorId,
        active: true
      }
    });

    if (queueLength >= 50) {
      return NextResponse.json({
        message: "Queue is full (max 50 songs)"
      }, { status: 400 })
    }

    const existingStream = await prisma.stream.findFirst({
      where: {
        userId: data.creatorId,
        extractedId: extractedId,
        active: true
      }
    });

    if (existingStream) {
      return NextResponse.json({
        message: "This song is already in the queue"
      }, { status: 400 });
    }

    const stream = await prisma.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId: extractedId,
        type: "Youtube",
        title: res.title ?? "Cannot find title",
        smallImg: `https://i.ytimg.com/vi/${extractedId}/hqdefault.jpg`,
        bigImg: `https://i.ytimg.com/vi/${extractedId}/maxresdefault.jpg`,
        addedById: user.id
      },
    });

    return NextResponse.json(
      { message: "Added Stream", id: stream.id },
      { status: 201 }
    );
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error("Zod Validation Error:", e.issues);
      return NextResponse.json({
        message: "Invalid input",
        errors: e.issues
      }, { status: 400 });
    }
    console.error("Error in POST /api/streams:", e);
    return NextResponse.json(
      { message: "Error while adding a stream", error: (e as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const session = await getServerSession(CONFIG);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!creatorId) {
    return NextResponse.json({
      message: "Error"
    }, {
      status: 411
    })
  }

  const [streams, activeStream] = await Promise.all([
    prisma.stream.findMany({
      where: {
        userId: creatorId,
        active: true 
      },
      orderBy: {
        upvotes: {
          _count: 'desc'
        }
      },
      include: {
        _count: {
          select: {
            upvotes: true
          }
        },
        upvotes: {
          where: {
            userId: user?.id ?? ""
          }
        },
        addedBy: {
          select: {
            email: true,
            // @ts-ignore
            name: true
          }
        }
      }
    }),
    prisma.currentStream.findFirst({
      where: {
        userId: creatorId
      },
      include: {
        stream: true
      }
    })
  ]);

  return NextResponse.json({
    streams: streams.map((s: any) => ({
      ...s,
      upvotes: s._count.upvotes,
      haveUpvoted: s.upvotes.length > 0,
      addedBy: s.addedBy?.name || s.addedBy?.email?.split('@')[0] || "Guest"
    })),
    activeStream: activeStream?.stream
  });

}
