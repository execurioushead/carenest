import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  await prisma.appointment.update({
    where: {
      id: Number(id),
    },
    data: {
      status: "cancelled",
    },
  });

  res.status(200).json({
    success: true,
  });
}