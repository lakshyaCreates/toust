import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { SigninForm } from "@/forms/signin-form";

export default function SigninPage() {
    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Sign in</CardTitle>
                    <CardDescription>
                        Enter your email address to receive a sign in link
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SigninForm />
                </CardContent>
            </Card>
        </div>
    );
}
