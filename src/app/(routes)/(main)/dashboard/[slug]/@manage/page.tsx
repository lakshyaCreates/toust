import { SortableToasts } from "@/features/manage-website";
import { getToastsByWebsiteId, getWebsiteByDomain } from "@/prisma/helpers";

export default async function ManageSlotRender({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const website = await getWebsiteByDomain(slug);
    if (!website) return <div>Failed to get website data</div>;

    const toasts = await getToastsByWebsiteId(website.id);

    return <SortableToasts toasts={toasts} websiteId={website.id} />;
}
