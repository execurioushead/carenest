import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!form.name || !form.phone || !form.email) { setError("Please fill all fields."); return; }
    if (!/^\d{10}$/.test(form.phone)) { setError("Enter a valid 10-digit phone number."); return; }
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: 24 }}>
        <div className="card" style={{ maxWidth: 420, width: "100%", padding: 40 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ background: "#2d6be4", color: "#fff", fontWeight: 800, fontSize: 22, padding: "6px 14px", borderRadius: 8, display: "inline-block", marginBottom: 16 }}>CareNest</div>
            <h2 style={{ fontSize: 22, fontWeight: 700 }}>Create Account</h2>
            <p style={{ color: "#6b7280", fontSize: 14 }}>Join millions of patients on CareNest</p>
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            {[
              { label: "Full Name", key: "name", placeholder: "Your full name", type: "text" },
              { label: "Mobile Number", key: "phone", placeholder: "10-digit number", type: "tel" },
              { label: "Email Address", key: "email", placeholder: "your@email.com", type: "email" },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>{f.label}</label>
                <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14 }} />
              </div>
            ))}
            {error && <p style={{ color: "#dc2626", fontSize: 13 }}>{error}</p>}
            <button className="btn-primary" style={{ padding: 14 }} onClick={handleSignup}>Create Account</button>
          </div>
          <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "#6b7280" }}>
            Already have an account? <Link href="/login"><span style={{ color: "#2d6be4", fontWeight: 600, cursor: "pointer" }}>Login</span></Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
