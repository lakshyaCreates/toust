import { ImSpinner3 } from "react-icons/im";

import { cn } from "@/lib/utils";

export const LoadingSpinner = ({
    inline,
    className,
}: {
    inline?: boolean;
    className?: string;
}) => {
    return (
        <div>
            {inline ? (
                <ImSpinner3 className={cn("size-3 animate-spin")} />
            ) : (
                <div className="flex h-screen items-center justify-center">
                    <ImSpinner3 className="size-6 animate-spin" />;
                </div>
            )}
        </div>
    );
};
