import { SortableToasts } from "./sortable-toasts";
import { getToastsByWebsite, getWebsiteByDomain } from "@/queries";

export default async function ManageSlot({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const website = await getWebsiteByDomain(slug);

    if (!website) return;

    const toasts = await getToastsByWebsite(website.id);

    return <SortableToasts toasts={toasts} websiteId={website.id} />;
}
