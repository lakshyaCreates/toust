export default async function WebsitePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    return <div>{slug}</div>;
}
