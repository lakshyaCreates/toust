import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getDomain(url: string) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;
        const parts = hostname.split(".");
        const topLevelDomain = parts.slice(-2).join(".");
        return topLevelDomain;
    } catch (error) {
        console.error("Invalid URL provided:", url);
        return null;
    }
}
