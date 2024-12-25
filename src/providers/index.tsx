import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/sonner";
import { ConfirmationDialog } from "@/features/confirmation-dialog";

import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster />

                {/* Globally used Dialogs */}
                <ConfirmationDialog />
            </ThemeProvider>
        </SessionProvider>
    );
}
