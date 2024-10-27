"use client";

import { type IconType } from "react-icons/lib";
import { MdPhonelink } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import {
    TbLayoutSidebarRightCollapse,
    TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="bg-sidebar fixed h-[calc(100vh-5rem)] max-h-full min-h-full w-56 border-r p-2">
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <Button
                        key={index}
                        asChild
                        variant={pathname === item.url ? "secondary" : "ghost"}
                        className="w-full"
                    >
                        <Link
                            href={item.url}
                            className="flex items-center gap-x-1"
                        >
                            <item.icon className="mb-0.5" />
                            <span>{item.label}</span>
                        </Link>
                    </Button>
                ))}
            </ul>
        </aside>
    );
};

interface ItemProps {
    label: string;
    icon: IconType;
    url: string;
}

const items: ItemProps[] = [
    {
        label: "Dashboard",
        icon: RiDashboardFill,
        url: "/dashboard",
    },
    {
        label: "Websites",
        icon: MdPhonelink,
        url: "/websites",
    },
];
