import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TestsPage() {
  const [tests, setTests] = useState([]);
  const [booking, setBooking] = useState(null);
  const [form, setForm] = useState({ patientName: "", patientPhone: "", date: "", address: "" });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/tests").then(r => r.json()).then(d => setTests(d.tests));
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const handleBook = async () => {
    setError("");
    if (!form.patientName || !form.patientPhone || !form.date) {
      setError("Please fill all required fields."); return;
    }
    const res = await fetch("/api/tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testId: booking.id, ...form }),
    });
    const data = await res.json();
    if (data.success) { setSuccess(data.order); setBooking(null); }
  };

  return (
    <>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #02b289, #007a5e)", padding: "52px 0", color: "#fff" }}>
        <div className="container">
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🧪 Lab Tests & Health Checkups</h1>
          <p style={{ opacity: 0.9, fontSize: 16 }}>NABL-certified labs · Home sample pickup · Digital reports</p>
        </div>
      </section>

      <div className="container" style={{ padding: "48px 20px" }}>
        {success ? (
          <div className="card" style={{ maxWidth: 520, margin: "0 auto", padding: 48, textAlign: "center" }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Test Booked!</h2>
            <p style={{ color: "#6b7280", marginBottom: 24 }}>Booking Ref: <strong>{success.ref}</strong></p>
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20, textAlign: "left", marginBottom: 28 }}>
              {[["Test", success.test.name], ["Patient", success.patientName], ["Date", success.date], ["Status", "Scheduled"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e5e7eb", fontSize: 14 }}>
                  <span style={{ color: "#6b7280" }}>{l}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => setSuccess(null)}>Book Another Test</button>
          </div>
        ) : (
          <>
            <h2 className="section-title">Popular Tests</h2>
            <p className="section-sub">Affordable prices with home sample pickup</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {tests.map(test => {
                const discounted = Math.round(test.price * (1 - test.discount / 100));
                return (
                  <div key={test.id} className="card" style={{ padding: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{test.name}</h3>
                    <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e" }}>₹{discounted}</span>
                      <span style={{ fontSize: 14, color: "#9ca3af", textDecoration: "line-through" }}>₹{test.price}</span>
                      <span className="badge badge-green">{test.discount}% OFF</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>⚡ {test.time} results</p>
                    <button className="btn-primary" style={{ width: "100%", padding: "11px" }}
                      onClick={() => setBooking(test)}>Book Now</button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Booking Modal */}
      {booking && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <div className="card" style={{ maxWidth: 480, width: "100%", padding: 36 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Book: {booking.name}</h2>
              <button onClick={() => setBooking(null)} style={{ fontSize: 20, background: "none", color: "#6b7280" }}>✕</button>
            </div>
            <div style={{ display: "grid", gap: 16 }}>
              {[
                { label: "Full Name *", key: "patientName", placeholder: "Your full name" },
                { label: "Phone Number *", key: "patientPhone", placeholder: "10-digit number" },
                { label: "Home Address", key: "address", placeholder: "Address for sample pickup" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14 }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Preferred Date *</label>
                <input type="date" min={today} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                  style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14 }} />
              </div>
              {error && <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: 8, fontSize: 13 }}>⚠️ {error}</div>}
              <button className="btn-primary" style={{ padding: "14px" }} onClick={handleBook}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
