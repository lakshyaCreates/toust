export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-full max-h-screen min-h-screen w-full items-center justify-center">
            {children}
        </div>
    );
}
