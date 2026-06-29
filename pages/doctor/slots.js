await fetch("/api/doctor/slots", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    doctorId: doctor.id,
    date: selectedDate,
    time: selectedTime,
  }),
});