import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@workspace/ui/components/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";

import { getCurrentUser } from "@/queries/user/get-current-user";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();

    if (user) {
        redirect("/");
    }

    return (
        <div className="flex items-center justify-center h-2/3">
            <div className="space-y-2">
                <Card className="md:w-96">
                    <CardHeader>
                        <CardTitle>Sign in</CardTitle>
                    </CardHeader>
                    <CardContent>{children}</CardContent>
                </Card>
                <Button size={"sm"} variant={"ghost"} asChild>
                    <Link href={"/"}>Back to home</Link>
                </Button>
            </div>
        </div>
    );
}
