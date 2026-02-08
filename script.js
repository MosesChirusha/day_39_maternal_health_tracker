const milestones = [
  { week: 12, text: "First trimester complete. First major scan recommended." },
  { week: 20, text: "Mid-pregnancy anatomy scan period." },
  { week: 28, text: "Third trimester begins. More frequent checkups advised." },
  { week: 36, text: "Prepare for delivery. Hospital visit planning important." },
  { week: 40, text: "Expected delivery period." }
];

function calculateProgress() {
  const startDate = document.getElementById("startDate").value;
  if (!startDate) return;

  localStorage.setItem("pregnancyStart", startDate);

  const today = new Date();
  const start = new Date(startDate);
  const diffWeeks = Math.floor((today - start) / (1000 * 60 * 60 * 24 * 7));

  document.getElementById("week").innerText = diffWeeks;

  let trimester = "First";
  if (diffWeeks >= 13 && diffWeeks < 27) trimester = "Second";
  if (diffWeeks >= 27) trimester = "Third";

  document.getElementById("trimester").innerText = trimester;

  const milestone = milestones.find(m => diffWeeks <= m.week);
  document.getElementById("milestoneText").innerText = milestone
    ? milestone.text
    : "Continue regular checkups and follow medical advice.";

  document.getElementById("progressSection").classList.remove("hidden");

  loadAppointments();
}

function addAppointment() {
  const date = document.getElementById("appointmentDate").value;
  if (!date) return;

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.push(date);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  document.getElementById("appointmentDate").value = "";
  loadAppointments();
}

function loadAppointments() {
  const list = document.getElementById("appointmentList");
  list.innerHTML = "";

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.forEach(date => {
    const li = document.createElement("li");
    li.innerText = date;
    list.appendChild(li);
  });
}

window.onload = () => {
  const savedStart = localStorage.getItem("pregnancyStart");
  if (savedStart) {
    document.getElementById("startDate").value = savedStart;
    calculateProgress();
  }
};
