import { ConfirmationDialog } from "@/features/confirmation-dialog";

import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                {/* Globally used Dialogs */}
                <ConfirmationDialog />
            </ThemeProvider>
        </>
    );
}
