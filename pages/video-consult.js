import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { consultCategories } from "../data/mockData";

export default function VideoConsult() {
  return (
    <>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #0f3080, #2d6be4)", padding: "60px 0", color: "#fff" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>📹 Video Consultation</h1>
          <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 500, margin: "0 auto 32px" }}>
            Connect with India's top doctors in under 60 seconds. Available 24/7 from the comfort of your home.
          </p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {[["⚡", "Connect in 60 secs"], ["🔒", "Private & secure"], ["💊", "Digital prescriptions"], ["📞", "24/7 available"]].map(([icon, label]) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 20px", fontSize: 14, fontWeight: 600 }}>
                {icon} {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: "60px 20px" }}>
        <h2 className="section-title">What do you need help with?</h2>
        <p className="section-sub">Select a category to connect with the right specialist instantly</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
          {consultCategories.map(cat => (
            <div key={cat.id} className="card" style={{ padding: 28, textAlign: "center", cursor: "pointer", background: cat.color, border: "none" }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>{cat.icon}</div>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e", lineHeight: 1.4, marginBottom: 14 }}>{cat.label}</p>
              <button className="btn-primary" style={{ width: "100%", padding: "10px" }}>Consult Now</button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 60, background: "#eef3fd", borderRadius: 16, padding: 36, textAlign: "center" }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Or find a specific doctor</h3>
          <p style={{ color: "#6b7280", marginBottom: 24 }}>Browse all available doctors for video consultation</p>
          <Link href="/doctors">
            <button className="btn-primary" style={{ padding: "14px 36px", fontSize: 16 }}>Browse All Doctors</button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
