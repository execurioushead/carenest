import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function DoctorProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/doctors/${id}`)
      .then(r => r.json())
      .then(d => { setDoctor(d.doctor); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <><Navbar />
      <div style={{ textAlign: "center", padding: 100, color: "#6b7280" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
        <p>Loading doctor profile...</p>
      </div>
      <Footer /></>
  );

  if (!doctor) return (
    <><Navbar />
      <div style={{ textAlign: "center", padding: 100 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
        <h2>Doctor not found</h2>
        <Link href="/doctors"><button className="btn-primary" style={{ marginTop: 20 }}>Back to Doctors</button></Link>
      </div>
      <Footer /></>
  );

  return (
    <>
      <Navbar />
      <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px 0" }}>
        <div className="container" style={{ maxWidth: 900 }}>

          {/* Back */}
          <Link href="/doctors">
            <span style={{ fontSize: 14, color: "#2d6be4", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
              ← Back to Doctors
            </span>
          </Link>

          {/* Profile Card */}
          <div className="card" style={{ padding: 36, marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ width: 100, height: 100, borderRadius: "50%", background: "#eef3fd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
                {doctor.image}
              </div>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{doctor.name}</h1>
                <p style={{ color: "#6b7280", marginBottom: 4 }}>{doctor.qualifications}</p>
                <p style={{ color: "#2d6be4", fontWeight: 600, fontSize: 16, marginBottom: 16 }}>{doctor.specialty}</p>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, color: "#6b7280" }}>🏥 {doctor.experience} years experience</span>
                  <span style={{ fontSize: 14, color: "#6b7280" }}>📍 {doctor.location}</span>
                  <span style={{ fontSize: 14, color: "#f59e0b" }}>
                    {"★".repeat(Math.floor(doctor.rating))}
                    <span style={{ color: "#6b7280" }}> {doctor.rating} ({doctor.reviews} reviews)</span>
                  </span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className={`badge ${doctor.available ? "badge-green" : "badge-red"}`} style={{ marginBottom: 16, display: "block" }}>
                  {doctor.available ? "✓ Available Today" : "Check Availability"}
                </span>
                <p style={{ fontSize: 13, color: "#6b7280" }}>Consultation fee</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", marginBottom: 16 }}>₹{doctor.fee}</p>
                <Link href={`/book/${doctor.id}`}>
                  <button className="btn-primary" style={{ width: "100%", padding: "12px 24px" }}>Book Appointment</button>
                </Link>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="card" style={{ padding: 28, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>About</h2>
            <p style={{ color: "#374151", lineHeight: 1.8 }}>{doctor.about}</p>
          </div>

          {/* Languages */}
          <div className="card" style={{ padding: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Languages Spoken</h2>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {doctor.languages.map(lang => (
                <span key={lang} className="badge badge-blue" style={{ padding: "6px 16px", fontSize: 14 }}>{lang}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
