-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamNum" INTEGER NOT NULL,
    "passwrod" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_teamNum_key" ON "Users"("teamNum");
