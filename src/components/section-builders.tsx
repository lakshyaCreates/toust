import { cn } from "@/lib/utils";

interface Props {
    className?: string;
    children: React.ReactNode;
}

export const Wrapper = ({
    id,
    className,
    children,
}: Props & { id?: string }) => {
    return (
        <section
            id={id}
            className={cn(
                "mx-auto h-full w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl",
                className,
            )}
        >
            {children}
        </section>
    );
};
