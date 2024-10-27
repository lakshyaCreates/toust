import { SortableTousts } from "./sortable-tousts";
import db from "@/prisma";

export const ToustContainer = async ({ websiteId }: { websiteId: string }) => {
    const toust = await db.toust.findMany({
        where: {
            websiteId: websiteId,
        },
        orderBy: {
            index: "asc",
        },
    });

    if (!toust || toust.length === 0) {
        return (
            <div className="text-center text-muted-foreground">
                No Tousts found!
            </div>
        );
    }

    return (
        <div className="h-full w-full">
            <SortableTousts toust={toust} />
        </div>
    );
};
