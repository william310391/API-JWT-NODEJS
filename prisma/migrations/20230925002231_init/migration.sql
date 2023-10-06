-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "date" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Users" ("date", "email", "id", "name", "password") SELECT "date", "email", "id", "name", "password" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
