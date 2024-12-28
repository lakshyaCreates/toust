import { Skeleton } from "@/components/ui/skeleton";

export default function WebsitesDefault() {
    return (
        <div className="flex flex-wrap items-center gap-2 pt-2">
            {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-72" />
            ))}
        </div>
    );
}
