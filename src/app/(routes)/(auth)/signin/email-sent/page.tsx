import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function EmailSentPage() {
    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Signin Link Sent</CardTitle>
                    <CardDescription>
                        We've sent you an email with a link to sign in.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
