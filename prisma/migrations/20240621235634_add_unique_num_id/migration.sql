/*
  Warnings:

  - A unique constraint covering the columns `[numID]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_numID_key" ON "Event"("numID");
