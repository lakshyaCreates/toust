import Link from "next/link";

import { Button } from "@workspace/ui/components/button";

import { SignoutButton } from "@/features/auth";
import { getCurrentUser } from "@/queries/user/get-current-user";

export const Header = async () => {
    const user = await getCurrentUser();

    return (
        <header className="h-16 border-b w-screen fixed">
            <div className="wrap flex items-center h-full justify-between">
                <h3 className="text-3xl font-bold tracking-tighter">
                    toust.so
                </h3>
                <div className="flex items-center gap-2">
                    {user ? (
                        <>
                            <Button size={"sm"} variant={"outline"}>
                                Dashboard
                            </Button>
                            <SignoutButton />
                        </>
                    ) : (
                        <>
                            <Button size={"sm"} asChild>
                                <Link href={"/sign-in"}>Sign in</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
