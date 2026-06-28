import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#1a1a2e", color: "#d1d5db", paddingTop: 60, paddingBottom: 40 }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ background: "#2d6be4", color: "#fff", fontWeight: 800, fontSize: 20, padding: "4px 12px", borderRadius: 8, display: "inline-block", marginBottom: 16 }}>CareNest</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#9ca3af" }}>
              India's leading digital healthcare platform. Connect with doctors, order medicines, and book lab tests.
            </p>
          </div>

          {/* For Patients */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 16, fontSize: 14 }}>For Patients</h4>
            {["Find Doctors", "Video Consult", "Lab Tests", "Health Articles", "Medicines"].map(item => (
              <div key={item} style={{ marginBottom: 10 }}>
                <Link href="#"><span style={{ fontSize: 13, color: "#9ca3af", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "#9ca3af"}>{item}</span></Link>
              </div>
            ))}
          </div>

          {/* For Doctors */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 16, fontSize: 14 }}>For Doctors</h4>
            {["CareNest Profile", "Ray by CareNest", "CareNest Reach", "For Hospitals", "For Clinics"].map(item => (
              <div key={item} style={{ marginBottom: 10 }}>
                <Link href="#"><span style={{ fontSize: 13, color: "#9ca3af", cursor: "pointer" }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "#9ca3af"}>{item}</span></Link>
              </div>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 16, fontSize: 14 }}>Company</h4>
            {["About Us", "Careers", "Press", "Blog", "Contact Us"].map(item => (
              <div key={item} style={{ marginBottom: 10 }}>
                <Link href="#"><span style={{ fontSize: 13, color: "#9ca3af", cursor: "pointer" }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "#9ca3af"}>{item}</span></Link>
              </div>
            ))}
          </div>

          {/* Social */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 16, fontSize: 14 }}>Follow Us</h4>
            {[["🐦 Twitter", "#"], ["📘 Facebook", "#"], ["💼 LinkedIn", "#"], ["▶️ YouTube", "#"]].map(([label, href]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <a href={href} style={{ fontSize: 13, color: "#9ca3af" }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "#9ca3af"}>{label}</a>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #374151", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "#6b7280" }}>© 2026 CareNest. All rights reserved.</p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms & Conditions", "Help"].map(item => (
              <Link key={item} href="#"><span style={{ fontSize: 13, color: "#6b7280", cursor: "pointer" }}>{item}</span></Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
