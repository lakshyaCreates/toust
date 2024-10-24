import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function SigninError() {
    return (
        <div className="flex h-screen items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Sign in Error</CardTitle>
                    <CardDescription>
                        There was error sending you the email
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
