import { SettingsForm } from "./settings-form";
import { getWebsiteByDomain } from "@/queries";

export default async function SettingsSlot({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const website = await getWebsiteByDomain(slug);

    if (!website) return;

    const settings = {
        waitFor: website.waitFor,
        toastEvery: website.toastEvery,
        toastDuration: website.toastDuration,
    };

    return <SettingsForm settings={settings} websiteId={website.id} />;
}
