export default async function WebsitePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    return (
        <div>
            <h3 className="text-xl font-semibold tracking-tight">{slug}</h3>
        </div>
    );
}
