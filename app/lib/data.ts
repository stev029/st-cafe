import { prisma } from "../database/prisma";

export async function fetchMenu() {
    const data = await prisma.menu.findMany({
        include: {
            categories: {
                select: {
                    name: true,
                }
            }
        },
    })

    return data
}

export async function fetchCategory() {
    const data = await prisma.category.findMany()

    return data
}