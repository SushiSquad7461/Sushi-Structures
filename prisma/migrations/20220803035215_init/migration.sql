/*
  Warnings:

  - You are about to drop the column `passwrod` on the `Users` table. All the data in the column will be lost.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamNum" INTEGER NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Users" ("id", "teamNum") SELECT "id", "teamNum" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_teamNum_key" ON "Users"("teamNum");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
