import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const doctors = await prisma.doctor.findMany();

  res.status(200).json({
    doctors,
    total: doctors.length,
  });
}