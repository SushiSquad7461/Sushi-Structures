/*
  Warnings:

  - Added the required column `expire` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamNum" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expire" DATETIME NOT NULL
);
INSERT INTO "new_Users" ("id", "password", "teamNum") SELECT "id", "password", "teamNum" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_teamNum_key" ON "Users"("teamNum");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
