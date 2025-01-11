import { AddWebsiteTrigger } from "@/features/dashboard";

export default function DashboardPage() {
    return (
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold md:text-2xl">Your Websites</h3>
            <AddWebsiteTrigger />
        </div>
    );
}
