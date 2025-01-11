import { Breadcrumbs } from "./breadcrumbs";

type Props = {
    params: {
        catchAll: string[];
    };
};
export default async function BreadcrumbsSlot({
    params,
}: {
    params: Promise<{ catchAll: string[] }>;
}) {
    const catchAll = (await params).catchAll;

    return <Breadcrumbs routes={catchAll} />;
}
