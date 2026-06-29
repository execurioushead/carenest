import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { doctorId, date, time } = req.body;

    const slot = await prisma.doctorSlot.create({
      data: {
        doctorId,
        date: new Date(date),
        time,
      },
    });

    return res.status(201).json(slot);
  }

  if (req.method === "GET") {
    const { doctorId } = req.query;

    const slots = await prisma.doctorSlot.findMany({
      where: {
        doctorId: Number(doctorId),
        available: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return res.status(200).json(slots);
  }
}