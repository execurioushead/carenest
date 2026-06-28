import { doctors } from "../../../data/mockData";

export default function handler(req, res) {
  const { id } = req.query;
  const doctor = doctors.find((d) => d.id === parseInt(id));

  if (!doctor) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  res.status(200).json({ doctor });
}
