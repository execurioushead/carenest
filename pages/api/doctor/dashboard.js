import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({
      error: "Please login first",
    });
  }

  const doctor = await prisma.doctor.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (!doctor) {
    return res.status(404).json({
      error: "Doctor profile not found",
    });
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId: doctor.id,
    },
    include: {
      user: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  return res.status(200).json({
    doctor,
    appointments,
  });
}