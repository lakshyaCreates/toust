import { cn } from "@/lib/utils";

export const Wrapper = ({
    id,
    className,
    children,
}: {
    id?: string;
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <section
            id={id}
            className={cn(
                "mx-auto h-full max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl",
                className,
            )}
        >
            {children}
        </section>
    );
};
