import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #e5e7eb",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 1px 8px rgba(0,0,0,0.06)"
    }}>
      <div className="container" style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 64
      }}>
        {/* Logo */}
        <Link href="/">
          <span style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <span style={{
              background: "#2d6be4", color: "#fff",
              fontWeight: 800, fontSize: 20, padding: "4px 12px",
              borderRadius: 8, letterSpacing: "-0.5px"
            }}>CareNest</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}
          className="desktop-nav">
          <Link href="/doctors">
            <span style={{ fontSize: 14, fontWeight: 500, color: "#374151", cursor: "pointer" }}
              className="nav-link">Find Doctors</span>
          </Link>
          <Link href="/video-consult">
            <span style={{ fontSize: 14, fontWeight: 500, color: "#374151", cursor: "pointer" }}
              className="nav-link">Video Consult</span>
          </Link>
          <Link href="/tests">
            <span style={{ fontSize: 14, fontWeight: 500, color: "#374151", cursor: "pointer" }}
              className="nav-link">Lab Tests</span>
          </Link>
          <Link href="/articles">
            <span style={{ fontSize: 14, fontWeight: 500, color: "#374151", cursor: "pointer" }}
              className="nav-link">Health Articles</span>
          </Link>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/login">
            <button className="btn-outline" style={{ padding: "8px 20px", fontSize: 14 }}>Login</button>
          </Link>
          <Link href="/signup">
            <button className="btn-primary" style={{ padding: "8px 20px", fontSize: 14 }}>Sign Up</button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
        .nav-link:hover { color: #2d6be4 !important; }
      `}</style>
    </nav>
  );
}
