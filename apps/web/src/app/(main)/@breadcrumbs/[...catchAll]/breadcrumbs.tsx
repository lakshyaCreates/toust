import React, { ReactElement } from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { cn } from "@workspace/ui/lib/utils";

export function Breadcrumbs({ routes = [] }: { routes: string[] }) {
    let fullHref: string | undefined = undefined;
    const breadcrumbItems: ReactElement[] = [];
    let breadcrumbPage: ReactElement = <></>;

    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        let href;

        href = fullHref ? `${fullHref}/${route}` : `/${route}`;
        fullHref = href;

        if (i === routes.length - 1) {
            breadcrumbPage = (
                <BreadcrumbItem>
                    <BreadcrumbPage className="!font-medium capitalize">
                        {route}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            );
        } else {
            breadcrumbItems.push(
                <React.Fragment key={href}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={href}
                            className={cn("capitalize")}
                        >
                            {route}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </React.Fragment>,
            );
        }
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Toust</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbItems}
                <BreadcrumbSeparator />
                {breadcrumbPage}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
