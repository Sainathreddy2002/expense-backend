/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Categories_userId_idx" ON "Categories"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_userId_name_key" ON "Categories"("userId", "name");
