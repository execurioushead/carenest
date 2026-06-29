import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  const { date, time } = req.body;

  const appointment = await prisma.appointment.update({
    where: {
      id: Number(id),
    },
    data: {
      date: new Date(date),
      time,
      status: "rescheduled",
    },
  });

  res.status(200).json({
    success: true,
    appointment,
  });
}