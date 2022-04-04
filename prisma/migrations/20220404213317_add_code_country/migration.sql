/*
  Warnings:

  - Added the required column `code` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL
);
INSERT INTO "new_Country" ("id", "name") SELECT "id", "name" FROM "Country";
DROP TABLE "Country";
ALTER TABLE "new_Country" RENAME TO "Country";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
