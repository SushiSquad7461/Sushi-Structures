-- CreateTable
CREATE TABLE "ConfigFiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamNum" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "configFile" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ConfigFiles_teamNum_year_key" ON "ConfigFiles"("teamNum", "year");
