import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { SigninForm } from "@/forms/signin-form";

export const SigninCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Signin</CardTitle>
                <CardDescription>
                    Use your email account to receive a signin link
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SigninForm />
            </CardContent>
        </Card>
    );
};
