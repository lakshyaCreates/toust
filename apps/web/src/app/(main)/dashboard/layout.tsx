import { Separator } from "@workspace/ui/components/separator";

export default function DashboardLayout({
    children,
    websites,
}: {
    children: React.ReactNode;
    websites: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            {children}
            <Separator />
            {websites}
        </div>
    );
}
