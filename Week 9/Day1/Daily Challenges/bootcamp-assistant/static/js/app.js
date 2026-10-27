const chatEl = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const newBtn = document.getElementById("new-btn");
const errorEl = document.getElementById("error");
const loadingEl = document.getElementById("loading");

function addMessage(role, text, sources) {
  const wrapper = document.createElement("div");
  wrapper.className = `msg ${role}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  if (sources && sources.length) {
    const s = document.createElement("span");
    s.className = "sources";
    s.textContent =
      "Sources: " +
      sources.map((x) => `[FAQ ${x.faq_id}] ${x.question || ""}`).join(" • ");
    bubble.appendChild(s);
  }

  wrapper.appendChild(bubble);
  chatEl.appendChild(wrapper);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.hidden = false;
}
function clearError() { errorEl.hidden = true; errorEl.textContent = ""; }

async function sendMessage(message) {
  clearError();
  addMessage("user", message);
  loadingEl.hidden = false;
  sendBtn.disabled = true;
  input.disabled = true;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      showError(data.error || `Request failed (${res.status})`);
    } else {
      addMessage("assistant", data.answer || "", data.sources);
    }
  } catch (e) {
    showError("Network error. Please try again.");
  } finally {
    loadingEl.hidden = true;
    sendBtn.disabled = false;
    input.disabled = false;
    input.focus();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;
  input.value = "";
  sendMessage(message);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    form.requestSubmit();
  }
});

newBtn.addEventListener("click", async () => {
  try {
    await fetch("/api/new-session", { method: "POST" });
  } catch (_) {}
  chatEl.replaceChildren();
  clearError();
  addMessage("assistant", "New conversation started. How can I help?");
  input.focus();
});

addMessage(
  "assistant",
  "Welcome to the AI Full-Stack Bootcamp! Ask me about the program, prerequisites, or type 'I want to register'."
);