import { Header } from "./_components/header";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Header />
            <main className="pt-16">{children}</main>
        </div>
    );
}
