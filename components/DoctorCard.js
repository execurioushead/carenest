import Link from "next/link";

export default function DoctorCard({ doctor }) {
  return (
    <div className="card" style={{ padding: 24, display: "flex", gap: 20, alignItems: "flex-start" }}>
      {/* Avatar */}
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: "#eef3fd", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 36, flexShrink: 0
      }}>
        {doctor.image}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", marginBottom: 2 }}>{doctor.name}</h3>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 4 }}>{doctor.qualifications}</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#2d6be4", marginBottom: 8 }}>{doctor.specialty}</p>
          </div>
          <span className={`badge ${doctor.available ? "badge-green" : "badge-red"}`}>
            {doctor.available ? "✓ Available Today" : "Next Available"}
          </span>
        </div>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 16 }}>
          <span style={{ fontSize: 13, color: "#6b7280" }}>🏥 {doctor.experience} yrs exp</span>
          <span style={{ fontSize: 13, color: "#6b7280" }}>📍 {doctor.location}</span>
          <span style={{ fontSize: 13, color: "#f59e0b" }}>
            {"★".repeat(Math.floor(doctor.rating))} <span style={{ color: "#6b7280" }}>{doctor.rating} ({doctor.reviews} reviews)</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <span style={{ fontSize: 13, color: "#6b7280" }}>Consultation Fee: </span>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>₹{doctor.fee}</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href={`/doctors/${doctor.id}`}>
              <button className="btn-outline" style={{ padding: "8px 18px", fontSize: 13 }}>View Profile</button>
            </Link>
            <Link href={`/book/${doctor.id}`}>
              <button className="btn-primary" style={{ padding: "8px 18px", fontSize: 13 }}>Book Appointment</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
