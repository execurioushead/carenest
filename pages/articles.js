import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/api/articles").then(r => r.json()).then(d => setArticles(d.articles));
  }, []);

  return (
    <>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #6366f1, #4338ca)", padding: "52px 0", color: "#fff" }}>
        <div className="container">
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📰 Health Articles</h1>
          <p style={{ opacity: 0.9, fontSize: 16 }}>Expert health advice from verified doctors</p>
        </div>
      </section>

      <div className="container" style={{ padding: "48px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
          {articles.map(article => (
            <div key={article.id} className="card" style={{ padding: 28, cursor: "pointer" }}>
              <span className="badge badge-blue" style={{ marginBottom: 14 }}>{article.category}</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", marginBottom: 12, lineHeight: 1.4 }}>{article.title}</h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, marginBottom: 20 }}>{article.excerpt}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid #e5e7eb" }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{article.author}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>{article.date} · {article.readTime}</p>
                </div>
                <span style={{ color: "#2d6be4", fontWeight: 700, fontSize: 13 }}>Read →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
