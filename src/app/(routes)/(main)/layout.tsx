import { redirect } from "next/navigation";

import { Sidebar } from "./_components/app-sidebar";
import { Header } from "./_components/header";
import { currentUser } from "@/helpers/current-user";
import { getUserById } from "@/prisma/queries/get/user";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();

    if (!user || !user.id) {
        redirect("/signin");
    }

    const dbUser = await getUserById(user.id!);

    // if (dbUser) {
    //     return <div className="screenCenter">{dbUser.name}</div>;
    // }

    if (
        !dbUser ||
        !dbUser.id ||
        dbUser.plan === "GUEST" ||
        dbUser.orderStatus !== "PAID"
    ) {
        redirect("/signin");
    }

    return (
        <>
            <Header user={dbUser!} />
            <div className="relative pt-20">
                <Sidebar />
                <main className="ml-56">{children}</main>
            </div>
        </>
    );
}
