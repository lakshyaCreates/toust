import Link from "next/link";

import { auth } from "@/auth";
import { getWebsiteByUserId } from "@/prisma/helpers/websites";

export default async function WebsitesSlot() {
    const session = await auth();
    const userId = session!.user!.id!;

    const websites = await getWebsiteByUserId(userId);

    if (!websites || websites.length === 0) {
        return <div>No Websites Found</div>;
    }

    return (
        <div className="flex flex-wrap items-center gap-2 pt-2">
            {websites.map((website, i) => (
                <div
                    key={`website-${i}`}
                    className="h-20 w-72 rounded border bg-accent px-6 py-4"
                >
                    <Link href={`/dashboard/${website.domain}`}>
                        <h3 className="text-lg font-medium tracking-tight md:text-xl">
                            {website.domain}
                        </h3>
                    </Link>
                    <p className="line-clamp-1 text-sm text-muted-foreground">
                        {website.note}
                    </p>
                </div>
            ))}
        </div>
    );
}
