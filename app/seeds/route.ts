import { prisma } from "../database/prisma";
import { categoryTable, menuTable, user } from "../lib/dummy";

export async function generateUser() {
    return await prisma.user.createManyAndReturn({
        data: user
    })
}

export async function generateCategories() {
    return await prisma.category.createManyAndReturn({
        data: categoryTable
    })
}

export async function generateMenu() {
    return await prisma.menu.createManyAndReturn({
        data: menuTable
    })
}

export async function GET() {
    try {
        await Promise.all([
            // generateUser(),
            // generateCategories(),
            generateMenu()
            
        ])

        return new Response("Data seeded successfully", { status: 200 });
    } catch (error) {
        console.error("Error seeding data:", error);
        return new Response("Error seeding data", { status: 500 });
    }
}