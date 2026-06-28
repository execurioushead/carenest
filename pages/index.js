import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { specialties, consultCategories, testimonials } from "../data/mockData";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) router.push(`/doctors?search=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #2d6be4 0%, #1a4fb0 60%, #0f3080 100%)",
        padding: "72px 0 80px", color: "#fff"
      }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
            Your Health, Our Priority
          </h1>
          <p style={{ fontSize: "clamp(15px, 2vw, 19px)", opacity: 0.88, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
            Connect with India's top doctors, book appointments, order medicines & lab tests — all in one place.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{
            display: "flex", maxWidth: 620, margin: "0 auto 48px",
            background: "#fff", borderRadius: 12, overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)"
          }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search doctors, specialties, symptoms..."
              style={{
                flex: 1, padding: "16px 20px", border: "none",
                fontSize: 15, color: "#1a1a2e", background: "transparent"
              }}
            />
            <button type="submit" className="btn-primary" style={{ borderRadius: 0, padding: "16px 28px", fontSize: 15 }}>
              Search
            </button>
          </form>

          {/* Quick Nav Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, maxWidth: 760, margin: "0 auto" }}>
            {[
              { label: "Video Consult", sub: "Connect in 60 secs", icon: "📹", href: "/video-consult" },
              { label: "Find Doctors", sub: "Book appointments", icon: "👨‍⚕️", href: "/doctors" },
              { label: "Lab Tests", sub: "Home sample pickup", icon: "🧪", href: "/tests" },
              { label: "Health Articles", sub: "Expert health tips", icon: "📰", href: "/articles" },
            ].map(item => (
              <Link key={item.label} href={item.href}>
                <div style={{
                  background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
                  borderRadius: 12, padding: "20px 16px", cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.2)",
                  transition: "background 0.2s, transform 0.2s"
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.22)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>{item.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULT ONLINE */}
      <section style={{ padding: "72px 0", background: "#fff" }}>
        <div className="container">
          <p style={{ color: "#2d6be4", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Online Consultation</p>
          <h2 className="section-title">Consult Top Doctors Online</h2>
          <p className="section-sub">Private online consultations with verified doctors in all specialties</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
            {consultCategories.map(cat => (
              <Link key={cat.id} href="/video-consult">
                <div className="card" style={{ padding: "24px 16px", textAlign: "center", cursor: "pointer", background: cat.color, border: "none" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{cat.icon}</div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", lineHeight: 1.4 }}>{cat.label}</p>
                  <p style={{ fontSize: 12, color: "#2d6be4", fontWeight: 700, marginTop: 10 }}>CONSULT NOW →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section style={{ padding: "72px 0", background: "#f8fafc" }}>
        <div className="container">
          <p style={{ color: "#2d6be4", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>In-Clinic</p>
          <h2 className="section-title">Book an Appointment by Specialty</h2>
          <p className="section-sub">Find experienced doctors across all specialties</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {specialties.map(sp => (
              <Link key={sp.id} href={`/doctors?specialty=${encodeURIComponent(sp.name)}`}>
                <div className="card" style={{ padding: "24px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: 32 }}>{sp.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 4 }}>{sp.name}</p>
                    <p style={{ fontSize: 12, color: "#6b7280" }}>{sp.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/doctors">
              <button className="btn-outline">View All Specialties</button>
            </Link>
          </div>
        </div>
      </section>

      {/* LAB TESTS BANNER */}
      <section style={{ padding: "72px 0", background: "linear-gradient(135deg, #02b289, #007a5e)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div style={{ color: "#fff" }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 12 }}>🧪 Book Lab Tests at Home</h2>
            <p style={{ fontSize: 16, opacity: 0.9, maxWidth: 480, marginBottom: 24 }}>
              Get safe, affordable lab tests with home sample pickup. Results delivered digitally.
              Up to 40% off on popular health packages.
            </p>
            <Link href="/tests">
              <button style={{ background: "#fff", color: "#02b289", fontWeight: 700, fontSize: 15, padding: "12px 28px", borderRadius: 8, border: "none", cursor: "pointer" }}>
                Book Now
              </button>
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["🔬", "NABL Certified Labs"], ["🏠", "Home Sample Pickup"], ["⚡", "Same Day Results"], ["📱", "Digital Reports"]].map(([icon, label]) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "14px 18px", color: "#fff", fontWeight: 600, fontSize: 13 }}>
                {icon} {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "72px 0", background: "#fff" }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: "center" }}>What Our Users Say</h2>
          <p className="section-sub" style={{ textAlign: "center" }}>Trusted by millions of patients across India</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.id} className="card" style={{ padding: 28 }}>
                <div style={{ color: "#f59e0b", fontSize: 18, marginBottom: 14 }}>{"★".repeat(t.rating)}</div>
                <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#eef3fd", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#2d6be4" }}>
                    {t.name[0]}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "60px 0", background: "#eef3fd" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24, textAlign: "center" }}>
            {[
              { value: "1Cr+", label: "Patients Served" },
              { value: "50K+", label: "Verified Doctors" },
              { value: "200+", label: "Cities" },
              { value: "4.8★", label: "App Rating" },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#2d6be4", marginBottom: 6 }}>{stat.value}</div>
                <div style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
