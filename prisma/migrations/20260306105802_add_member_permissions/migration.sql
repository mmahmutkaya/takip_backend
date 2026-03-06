-- AlterTable
ALTER TABLE "project_members" ADD COLUMN     "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[];
