import { redirect } from "next/navigation";

import { currentUser } from "@/helpers/current-user";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();

    if (user) {
        redirect(process.env.SIGNIN_SUCCESS_REDIRECT!);
    }

    return (
        <div className="flex h-full max-h-screen min-h-screen items-center justify-center">
            {children}
        </div>
    );
}
