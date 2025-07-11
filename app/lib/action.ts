"use server";

import z from "zod";
import { prisma } from "../database/prisma";

const FormSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.coerce.number().min(1),
    stock: z.coerce.number().min(1),
    categoryId: z.string()
})

const CreateMenuSchema = FormSchema.omit({ id: true });

export async function createMenu(formData: FormData) {
    try {
        const form = await CreateMenuSchema.parseAsync(formData)
        // const menu = await prisma.menu.create({
        //     data: form
        // })
    } catch (error) {
        console.log(error)
    }
}