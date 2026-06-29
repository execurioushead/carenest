import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
  const {
  userId,
  doctorId,
  patientName,
  patientPhone,
  date,
  time,
  paymentId,
  paymentStatus,
  amountPaid,
} = req.body;

  if (!doctorId || !patientName || !patientPhone || !date || !time) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  const appointment = await prisma.appointment.create({
  data: {
    userId,
    doctorId: parseInt(doctorId),
    patientName,
    patientPhone,
    time,
    date: new Date(date),

    paymentId,
    paymentStatus,
    amountPaid,

    status: "confirmed",
  },
});

await prisma.doctorSlot.updateMany({
  where: {
    doctorId: parseInt(doctorId),
    date: new Date(date),
    time,
  },
  data: {
    available: false,
  },
});

return res.status(201).json({
  success: true,
  appointment,
});
}

  if (req.method === "GET") {
    const appointments = await prisma.appointment.findMany();

    return res.status(200).json({
      appointments,
    });
  }

  return res.status(405).json({
    error: "Method not allowed",
  });
}