import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      doctor: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  res.status(200).json({
    appointments,
  });
}