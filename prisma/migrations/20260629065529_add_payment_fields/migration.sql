-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "amountPaid" INTEGER,
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'pending';
