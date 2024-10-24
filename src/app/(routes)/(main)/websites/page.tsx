import { auth } from "@/auth";

export default async function WebsitesPage() {
    const session = await auth();
    const user = session?.user;

    return <div>{JSON.stringify(user)}</div>;
}
