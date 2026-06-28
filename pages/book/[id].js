import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"];

export default function BookAppointment() {
  const router = useRouter();
  const { id } = router.query;

  const [doctor, setDoctor] = useState(null);
  const [form, setForm] = useState({ patientName: "", patientPhone: "", date: "", time: "" });
  const [submitted, setSubmitted] = useState(false);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/doctors/${id}`).then(r => r.json()).then(d => setDoctor(d.doctor));
  }, [id]);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    setError("");
    if (!form.patientName || !form.patientPhone || !form.date || !form.time) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^\d{10}$/.test(form.patientPhone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctorId: doctor.id, doctorName: doctor.name, specialty: doctor.specialty, ...form }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) { setBooking(data.booking); setSubmitted(true); }
    else setError("Booking failed. Please try again.");
  };

  if (submitted && booking) return (
    <>
      <Navbar />
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div className="card" style={{ maxWidth: 520, width: "100%", padding: 48, textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 8 }}>Appointment Confirmed!</h2>
          <p style={{ color: "#6b7280", marginBottom: 32 }}>Your appointment has been successfully booked.</p>

          <div style={{ background: "#f8fafc", borderRadius: 12, padding: 24, textAlign: "left", marginBottom: 32 }}>
            {[
              ["Booking Ref", booking.bookingRef],
              ["Doctor", booking.doctorName],
              ["Specialty", booking.specialty],
              ["Patient", booking.patientName],
              ["Date", booking.date],
              ["Time", booking.time],
              ["Status", "Confirmed ✓"],
            ].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e5e7eb", fontSize: 14 }}>
                <span style={{ color: "#6b7280" }}>{label}</span>
                <span style={{ fontWeight: 600, color: label === "Status" ? "#16a34a" : "#1a1a2e" }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Link href="/doctors"><button className="btn-outline">Find More Doctors</button></Link>
            <Link href="/"><button className="btn-primary">Back to Home</button></Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px 0" }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <Link href={doctor ? `/doctors/${doctor.id}` : "/doctors"}>
            <span style={{ fontSize: 14, color: "#2d6be4", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>← Back</span>
          </Link>

          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24 }}>Book Appointment</h1>

          {doctor && (
            <div className="card" style={{ padding: 24, marginBottom: 24, display: "flex", gap: 16, alignItems: "center" }}>
              <span style={{ fontSize: 40 }}>{doctor.image}</span>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700 }}>{doctor.name}</h3>
                <p style={{ fontSize: 14, color: "#6b7280" }}>{doctor.specialty} • {doctor.qualifications}</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#2d6be4", marginTop: 4 }}>₹{doctor.fee} consultation fee</p>
              </div>
            </div>
          )}

          <div className="card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Patient Details</h2>

            <div style={{ display: "grid", gap: 20 }}>
              <div>
                <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 8 }}>Full Name *</label>
                <input
                  value={form.patientName}
                  onChange={e => setForm({ ...form, patientName: e.target.value })}
                  placeholder="Enter your full name"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 15 }}
                />
              </div>

              <div>
                <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 8 }}>Phone Number *</label>
                <input
                  value={form.patientPhone}
                  onChange={e => setForm({ ...form, patientPhone: e.target.value })}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 15 }}
                />
              </div>

              <div>
                <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 8 }}>Preferred Date *</label>
                <input
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 15 }}
                />
              </div>

              <div>
                <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 12 }}>Select Time Slot *</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10 }}>
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setForm({ ...form, time: slot })}
                      style={{
                        padding: "10px 8px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                        border: form.time === slot ? "2px solid #2d6be4" : "2px solid #e5e7eb",
                        background: form.time === slot ? "#eef3fd" : "#fff",
                        color: form.time === slot ? "#2d6be4" : "#374151",
                        transition: "all 0.15s"
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div style={{ background: "#fee2e2", color: "#dc2626", padding: "12px 16px", borderRadius: 8, fontSize: 14 }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary"
                style={{ padding: "16px", fontSize: 16, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Booking..." : "Confirm Appointment"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
