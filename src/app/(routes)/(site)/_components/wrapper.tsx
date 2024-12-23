export const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mx-auto size-full max-w-[90%] xl:max-w-7xl">
            {children}
        </div>
    );
};
