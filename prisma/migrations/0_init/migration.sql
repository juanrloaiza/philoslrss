-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "dateFetched" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "pubDate" TIMESTAMP(3) NOT NULL,
    "creator" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_title_key" ON "Event"("title");

