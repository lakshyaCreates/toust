"use client";

import { useEffect, useState } from "react";

import { useIsMounted } from "usehooks-ts";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "./theme-provider";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Providers({ children }: { children: React.ReactNode }) {
    const [ok, setOk] = useState(false);
    const isMounted = useIsMounted();

    useEffect(() => {
        void delay(1000).then(() => {
            if (isMounted()) setOk(true);
        });
    }, [isMounted]);

    if (!ok) return <LoadingSpinner />;

    return (
        <>
            {ok && (
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster />
                </ThemeProvider>
            )}
        </>
    );
}
