-- CreateTable
CREATE TABLE "Projet" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Projet_id_key" ON "Projet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Projet_code_key" ON "Projet"("code");
