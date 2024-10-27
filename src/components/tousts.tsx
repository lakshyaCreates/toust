import { toast } from "sonner";

import { ToastComponent } from "@/app/(routes)/testing/toast-component";
import db from "@/prisma";
import { getUserByEmail } from "@/prisma/queries/get/user";

interface ToastProps {
    email: string;
    website: string;
}

export const Tousts: React.FC<ToastProps> = async ({ email, website }) => {
    const user = await getUserByEmail(email);

    if (!user) {
        toast.error("User not found!");
        return null;
    }

    const userWebsites = await db.website.findMany({
        select: {
            id: true,
            url: true,
        },
        where: {
            userId: user.id,
        },
    });

    if (!userWebsites) {
        toast.error("Websites not found!");
        return null;
    }

    const websitesUrls = userWebsites.map((website) => website.url);

    if (!websitesUrls.includes(website)) {
        toast.error("Website not found!");
        return null;
    }

    const websiteId = await db.website.findFirst({
        where: {
            userId: user.id,
            url: website,
        },
    });

    if (!websiteId) {
        toast.error("Website not found!");
        return null;
    }

    const data = await db.toust.findMany({
        where: {
            websiteId: websiteId.id,
        },
    });

    const values = {
        message: data,
        toastEvery: websiteId.toastEvery,
        toastDuration: websiteId.toastDuration,
        waitFor: websiteId.waitFor,
    };

    return <ToastComponent values={values} />;
};
