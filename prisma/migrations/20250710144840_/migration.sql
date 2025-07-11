-- DropForeignKey
ALTER TABLE "menus" DROP CONSTRAINT "menus_categoryId_fkey";

-- AlterTable
ALTER TABLE "menus" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
