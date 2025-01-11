import { redirect } from "next/navigation";

import { getCurrentUser, getWebsite } from "@/queries";

export default async function DashboardSlugLayout({
    children,
    manage,
    settings,
    params,
}: {
    children: React.ReactNode;
    manage: React.ReactNode;
    settings: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const user = await getCurrentUser();
    const website = await getWebsite(slug, user!.id);

    if (!website) {
        redirect("/dashboard");
    }

    return (
        <div className="space-y-2 divide-y">
            {children}
            <div className="grid max-w-7xl grid-cols-1 gap-6 pt-4 lg:grid-cols-5">
                <div className="col-span-1 lg:col-span-3">{manage}</div>
                <div className="col-span-1 lg:col-span-2">{settings}</div>
            </div>
        </div>
    );
}
