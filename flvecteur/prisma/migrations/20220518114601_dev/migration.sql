-- CreateTable
CREATE TABLE "news" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT,
    "type" TEXT,
    "order" INTEGER,
    "publie" BOOLEAN DEFAULT true
);
