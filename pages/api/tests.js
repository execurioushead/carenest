import { labTests } from "../../data/mockData";

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ tests: labTests });
  }

  if (req.method === "POST") {
    const { testId, patientName, patientPhone, date, address } = req.body;
    if (!testId || !patientName || !patientPhone || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const test = labTests.find((t) => t.id === parseInt(testId));
    return res.status(201).json({
      success: true,
      order: {
        id: Date.now(),
        test,
        patientName,
        patientPhone,
        date,
        address,
        status: "scheduled",
        ref: `LAB${Date.now()}`,
      },
    });
  }

  res.status(405).json({ error: "Method not allowed" });
}
