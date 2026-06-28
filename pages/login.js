import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ phone: "", otp: "" });
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const sendOtp = () => {
    if (!/^\d{10}$/.test(form.phone)) { setError("Enter a valid 10-digit number."); return; }
    setError("");
    setStep(2);
  };

  const verifyOtp = () => {
    if (form.otp === "1234") { router.push("/"); }
    else { setError("Invalid OTP. Use 1234 for demo."); }
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: 24 }}>
        <div className="card" style={{ maxWidth: 420, width: "100%", padding: 40 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ background: "#2d6be4", color: "#fff", fontWeight: 800, fontSize: 22, padding: "6px 14px", borderRadius: 8, display: "inline-block", marginBottom: 16 }}>CareNest</div>
            <h2 style={{ fontSize: 22, fontWeight: 700 }}>Welcome Back</h2>
            <p style={{ color: "#6b7280", fontSize: 14 }}>Login to manage your appointments</p>
          </div>

          {step === 1 ? (
            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Mobile Number</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ padding: "12px 14px", background: "#f3f4f6", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, color: "#374151" }}>+91</span>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit number" maxLength={10}
                    style={{ flex: 1, padding: "12px 14px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14 }} />
                </div>
              </div>
              {error && <p style={{ color: "#dc2626", fontSize: 13 }}>{error}</p>}
              <button className="btn-primary" style={{ padding: 14 }} onClick={sendOtp}>Send OTP</button>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              <p style={{ fontSize: 14, color: "#6b7280", textAlign: "center" }}>OTP sent to +91 {form.phone} <br /><strong>(Demo OTP: 1234)</strong></p>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Enter OTP</label>
                <input value={form.otp} onChange={e => setForm({ ...form, otp: e.target.value })} placeholder="4-digit OTP" maxLength={4}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 18, textAlign: "center", letterSpacing: 8 }} />
              </div>
              {error && <p style={{ color: "#dc2626", fontSize: 13 }}>{error}</p>}
              <button className="btn-primary" style={{ padding: 14 }} onClick={verifyOtp}>Verify & Login</button>
              <button style={{ background: "none", color: "#2d6be4", fontSize: 14, fontWeight: 600 }} onClick={() => setStep(1)}>← Change Number</button>
            </div>
          )}

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "#6b7280" }}>
            Don't have an account? <Link href="/signup"><span style={{ color: "#2d6be4", fontWeight: 600, cursor: "pointer" }}>Sign Up</span></Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
