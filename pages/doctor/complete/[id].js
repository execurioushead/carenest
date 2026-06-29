import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const { id } = req.query;

  const appointment = await prisma.appointment.update({
    where: {
      id: Number(id),
    },
    data: {
      status: "completed",
    },
  });

  res.status(200).json({
    success: true,
    appointment,
  });
}