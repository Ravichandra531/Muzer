
import StreamView from "../../components/StreamView"

export default async function CreatorPage({
    params
}: {
    params: Promise<{ creatorId: string }>
}) {
    const { creatorId } = await params;
    return (
        <StreamView creatorId={creatorId} isCreator={false} />
    )
}