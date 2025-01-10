"use server";

import { revalidateTag } from "next/cache";

import { signoutUser } from "..";
import { Button } from "@workspace/ui/components/button";

export const SignoutButton = async () => {
    async function onSubmit() {
        "use server";
        await signoutUser();
        revalidateTag("user");
        revalidateTag("users");

        return;
    }

    return (
        <form action={onSubmit}>
            <Button type="submit" size={"sm"} variant={"destructive"}>
                Sign out
            </Button>
        </form>
    );
};
