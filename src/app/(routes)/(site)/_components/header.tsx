import Image from "next/image";
import Link from "next/link";

import { signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/helpers";

import { Wrapper } from "./wrapper";

export const Header = async () => {
    const user = await getCurrentUser();

    return (
        <header className="h-16 w-screen border-b bg-background">
            <Wrapper>
                <div className="flex h-full items-center justify-between">
                    <div className="flex items-center gap-x-2">
                        <Image
                            src={`/toust-icon.png`}
                            alt="Toust Icon"
                            width={124}
                            height={124}
                            className="size-8"
                        />
                        <h2 className="font-sans text-xl font-bold uppercase tracking-tighter md:text-2xl">
                            toust
                        </h2>
                    </div>
                    <div>nav...</div>
                    {!user ? (
                        <form
                            action={async () => {
                                "use server";
                                await signIn("google");
                            }}
                        >
                            <Button type="submit">Sign in</Button>
                        </form>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button asChild variant={"secondary"}>
                                <Link href={"/dashboard"}>Dashboard</Link>
                            </Button>
                            <form
                                action={async () => {
                                    "use server";

                                    await signOut();
                                }}
                            >
                                <Button type="submit" variant={"destructive"}>
                                    Sign out
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </Wrapper>
        </header>
    );
};
