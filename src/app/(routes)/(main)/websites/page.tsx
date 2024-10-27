import Link from "next/link";
import { redirect } from "next/navigation";

import { getDomain } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

import { AddWebsiteButton } from "./_components/add-website-button";
import { auth } from "@/auth";
import { currentUser } from "@/helpers/current-user";
import db from "@/prisma";
import { getUserById } from "@/prisma/queries/get/user";

export default async function WebsitesPage() {
    const user = await currentUser();
    const dbUser = await getUserById(user!.id!);
    if (!dbUser) redirect("/signin");

    const plan = dbUser.plan;

    const websites = await db.website.findMany({
        where: {
            userId: dbUser.id,
        },
    });

    return (
        <div className="space-y-4 p-8">
            <div className="flex w-full items-center justify-between">
                <h3 className="text-3xl font-semibold tracking-tight">
                    Your Websites
                </h3>
                <AddWebsiteButton
                    disabled={plan === "APPETIZER" && websites.length >= 1}
                />
            </div>
            <Separator />
            {websites.length === 0 ? (
                <div className="text-center">No Websites found!</div>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {websites.map((website, index) => (
                        <Link
                            key={index}
                            href={`/websites/${website.id}`}
                            className="h-fit w-fit rounded-lg border bg-gradient-to-br from-accent/60 to-accent/30 p-4 text-xl font-medium"
                        >
                            {getDomain(website.url)}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
