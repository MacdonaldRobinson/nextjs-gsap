import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const seedData = async () => {
    await prismaClient.post.createMany({
        data: [
            {
                title: "seed title",
                body: "seed data",
            },
        ],
        skipDuplicates: true,
    });

    console.log("Seed finished!");
};

seedData()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prismaClient.$disconnect();
    });
