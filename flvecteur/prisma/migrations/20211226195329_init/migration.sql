-- CreateTable
CREATE TABLE "commentaires" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userid" INTEGER,
    "date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "coments" TEXT,
    "type" TEXT,
    "publie" BOOLEAN DEFAULT true,
    FOREIGN KEY ("userid") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "nom" TEXT,
    "prenom" TEXT,
    "email" TEXT,
    "mdp" TEXT,
    "pouvoir" TEXT,
    "createdat" DATETIME,
    "updatedat" DATETIME
);
