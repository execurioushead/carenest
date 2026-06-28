import { articles } from "../../data/mockData";

export default function handler(req, res) {
  const { category } = req.query;
  let results = [...articles];
  if (category) {
    results = results.filter((a) =>
      a.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  res.status(200).json({ articles: results });
}
