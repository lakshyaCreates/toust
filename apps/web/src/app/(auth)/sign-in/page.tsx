import { FaGoogle } from "react-icons/fa6";

import { Button } from "@workspace/ui/components/button";

import { signInUser } from "@/features/auth";

export default async function SignInPage() {
    async function onSubmit() {
        "use server";
        await signInUser();
    }

    return (
        <form action={onSubmit}>
            <Button type="submit" className="w-full flex items-center">
                <FaGoogle />
                Sign in with Google
            </Button>
        </form>
    );
}
