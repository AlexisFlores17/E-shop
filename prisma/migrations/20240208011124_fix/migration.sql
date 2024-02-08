/*
  Warnings:

  - You are about to drop the column `size` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Sizes" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "size",
ADD COLUMN     "sizes" "Sizes"[] DEFAULT ARRAY[]::"Sizes"[];

-- DropEnum
DROP TYPE "Size";
