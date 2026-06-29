import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("/api/doctor/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data.doctor);
        setAppointments(data.appointments || []);
      });
  }, []);

  const markCompleted = async (id) => {
    await fetch(`/api/doctor/complete/${id}`, {
      method: "POST",
    });

    setAppointments(
      appointments.map((a) =>
        a.id === id
          ? { ...a, status: "completed" }
          : a
      )
    );
  };

  return (
    <>
      <Navbar />

      <div
        className="container"
        style={{
          padding: "40px 0",
          minHeight: "80vh",
        }}
      >
        <h1 style={{ marginBottom: 30 }}>
          Doctor Dashboard
        </h1>

        {doctor && (
          <div
            className="card"
            style={{
              padding: 20,
              marginBottom: 30,
            }}
          >
            <h2>{doctor.name}</h2>
            <p>{doctor.specialty}</p>
            <p>{doctor.location}</p>
            <p>{doctor.experience} years experience</p>
          </div>
        )}

        <h2>Upcoming Appointments</h2>

        {appointments.length === 0 && (
          <p>No appointments found.</p>
        )}

        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="card"
            style={{
              padding: 20,
              marginTop: 20,
            }}
          >
            <h3>{appointment.patientName}</h3>

            <p>
              Phone: {appointment.patientPhone}
            </p>

            <p>
              Date:{" "}
              {new Date(
                appointment.date
              ).toLocaleDateString()}
            </p>

            <p>
              Time: {appointment.time}
            </p>

            <p>
              Status: {appointment.status}
            </p>

            {appointment.status !== "completed" && (
  <button
    className="btn-primary"
    onClick={async () => {
      await fetch(
        `/api/doctor/complete/${appointment.id}`,
        {
          method: "POST",
        }
      );

      window.location.reload();
    }}
    style={{
      marginTop: 12,
      padding: "10px 18px",
    }}
  >
    Mark Completed
  </button>
)}
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}