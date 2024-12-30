import { ensureUser } from "@/helpers/ensure-user";

export default async function DashboardSlugLayout({
    children,
    manage,
    settings,
}: {
    children: React.ReactNode;
    manage: React.ReactNode;
    settings: React.ReactNode;
}) {
    await ensureUser();

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
