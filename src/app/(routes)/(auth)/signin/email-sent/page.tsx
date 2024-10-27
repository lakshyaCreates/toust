import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function SigninEmailSentPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Signin</CardTitle>
                <CardDescription>
                    We've sent you a signin link to your email
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div>Use the link that you have received to signin</div>
            </CardContent>
        </Card>
    );
}
