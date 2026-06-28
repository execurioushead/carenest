// In production, this would write to a database (PostgreSQL/MongoDB)
// For now, we store in memory (resets on server restart)

let bookings = [];
let nextId = 1;

export default function handler(req, res) {
  if (req.method === "POST") {
    const { doctorId, doctorName, patientName, patientPhone, date, time, specialty } = req.body;

    if (!doctorId || !patientName || !patientPhone || !date || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const booking = {
      id: nextId++,
      doctorId,
      doctorName,
      patientName,
      patientPhone,
      date,
      time,
      specialty,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      bookingRef: `PRC${Date.now()}`,
    };

    bookings.push(booking);
    return res.status(201).json({ success: true, booking });
  }

  if (req.method === "GET") {
    const { phone } = req.query;
    if (phone) {
      const userBookings = bookings.filter((b) => b.patientPhone === phone);
      return res.status(200).json({ bookings: userBookings });
    }
    return res.status(200).json({ bookings });
  }

  res.status(405).json({ error: "Method not allowed" });
}
