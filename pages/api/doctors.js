import { doctors } from "../../data/mockData";

export default function handler(req, res) {
  const { specialty, search, available } = req.query;

  let results = [...doctors];

  if (specialty) {
    results = results.filter((d) =>
      d.specialty.toLowerCase().includes(specialty.toLowerCase())
    );
  }

  if (search) {
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase()) ||
        d.location.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (available === "true") {
    results = results.filter((d) => d.available);
  }

  res.status(200).json({ doctors: results, total: results.length });
}
