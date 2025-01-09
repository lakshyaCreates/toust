import prisma from "..";

async function main() {
    // Clean up existing data
    await prisma.toast.deleteMany({});
    await prisma.website.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.verificationToken.deleteMany({});

    // Create sample user
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john@example.com",
            contact: "+1234567890",
            emailVerified: new Date(),
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        },
    });

    // Create sample websites
    const website1 = await prisma.website.create({
        data: {
            domain: "example.com",
            note: "Main company website",
            userId: user.id,
            waitFor: 1200,
            toastEvery: 2000,
            toastDuration: 7000,
        },
    });

    const website2 = await prisma.website.create({
        data: {
            domain: "blog.example.com",
            note: "Company blog",
            userId: user.id,
            waitFor: 800,
            toastEvery: 1800,
            toastDuration: 6000,
        },
    });

    // Create sample toasts for website1
    const toastsWebsite1 = await prisma.toast.createMany({
        data: [
            {
                title: "Just purchased our Premium Plan!",
                author: "Sarah Johnson",
                timeAgo: "2 minutes ago",
                order: 1,
                websiteId: website1.id,
            },
            {
                title: "Upgraded to Business Package",
                author: "Mike Smith",
                timeAgo: "5 minutes ago",
                order: 2,
                websiteId: website1.id,
            },
            {
                title: "New subscription started",
                author: "Emily Brown",
                timeAgo: "10 minutes ago",
                order: 3,
                websiteId: website1.id,
            },
        ],
    });

    // Create sample toasts for website2
    const toastsWebsite2 = await prisma.toast.createMany({
        data: [
            {
                title: 'New comment on "Getting Started"',
                author: "David Wilson",
                timeAgo: "1 minute ago",
                order: 1,
                websiteId: website2.id,
            },
            {
                title: "Subscribed to newsletter",
                author: "Lisa Anderson",
                timeAgo: "3 minutes ago",
                order: 2,
                websiteId: website2.id,
            },
        ],
    });

    console.log("Seed data created successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
