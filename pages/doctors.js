import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorCard from "../components/DoctorCard";
import { specialties } from "../data/mockData";

export default function DoctorsPage() {
  const router = useRouter();
  const { search: qSearch, specialty: qSpecialty } = router.query;

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  useEffect(() => {
    if (qSearch) setSearch(qSearch);
    if (qSpecialty) setSelectedSpecialty(qSpecialty);
  }, [qSearch, qSpecialty]);

  useEffect(() => {
    fetchDoctors();
  }, [search, selectedSpecialty, onlyAvailable]);

  const fetchDoctors = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedSpecialty) params.set("specialty", selectedSpecialty);
    if (onlyAvailable) params.set("available", "true");

    const res = await fetch(`/api/doctors?${params}`);
    const data = await res.json();
    setDoctors(data.doctors);
    setLoading(false);
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, #2d6be4, #1a4fb0)", padding: "48px 0", color: "#fff" }}>
        <div className="container">
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Find the Right Doctor</h1>
          <p style={{ opacity: 0.85, marginBottom: 28 }}>Search from 50,000+ verified doctors across India</p>
          <div style={{ display: "flex", gap: 12, maxWidth: 700, flexWrap: "wrap" }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, specialty, or location..."
              style={{ flex: 1, minWidth: 220, padding: "14px 18px", borderRadius: 8, border: "none", fontSize: 15, color: "#1a1a2e" }}
            />
            <select
              value={selectedSpecialty}
              onChange={e => setSelectedSpecialty(e.target.value)}
              style={{ padding: "14px 18px", borderRadius: 8, border: "none", fontSize: 14, color: "#1a1a2e", minWidth: 180 }}
            >
              <option value="">All Specialties</option>
              {specialties.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: "40px 20px" }}>
        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Filters:</span>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14 }}>
            <input type="checkbox" checked={onlyAvailable} onChange={e => setOnlyAvailable(e.target.checked)} />
            Available Today
          </label>
          {selectedSpecialty && (
            <span style={{ background: "#eef3fd", color: "#2d6be4", padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
              {selectedSpecialty} <span style={{ cursor: "pointer", marginLeft: 6 }} onClick={() => setSelectedSpecialty("")}>✕</span>
            </span>
          )}
        </div>

        {/* Results count */}
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
          {loading ? "Searching..." : `${doctors.length} doctors found`}
        </p>

        {/* Results */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#6b7280" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
            <p>Loading doctors...</p>
          </div>
        ) : doctors.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80, color: "#6b7280" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No doctors found</p>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {doctors.map(doc => <DoctorCard key={doc.id} doctor={doc} />)}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
