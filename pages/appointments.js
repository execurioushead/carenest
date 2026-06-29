import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Appointments() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!session) return;

    fetch("/api/my-appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data.appointments));
  }, [session]);

  return (
    <>
      <Navbar />

      <div className="container" style={{ padding: 40 }}>
        <h1>My Appointments</h1>

        {appointments.map((appointment) => (
          <div
  key={appointment.id}
  className="card"
  style={{
    padding: 20,
    marginBottom: 20,
  }}
>
  <h3>{appointment.doctor.name}</h3>

  <p>{appointment.doctor.specialty}</p>

  <p>
    Date: {new Date(appointment.date).toLocaleDateString()}
  </p>

  <p>
    Time: {appointment.time}
  </p>

  <p>
    Appointment Status: {appointment.status}
  </p>

  <hr />

  <h4>Payment Details</h4>

  <p>
    Payment ID: {appointment.paymentId}
  </p>

  <p>
    Amount Paid: ₹{appointment.amountPaid}
  </p>

  <p>
    Payment Status: {appointment.paymentStatus}
  </p>

  <button
    onClick={async () => {
      await fetch(`/api/cancel/${appointment.id}`, {
        method: "POST",
      });

      window.location.reload();
    }}
  >
    Cancel Appointment
  </button>
</div>
        ))}
      </div>

      <Footer />
    </>
  );
}