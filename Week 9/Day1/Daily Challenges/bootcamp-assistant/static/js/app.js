const chat   = document.getElementById('chat');
const form   = document.getElementById('form');
const input  = document.getElementById('msg');
const send   = document.getElementById('send');
const status = document.getElementById('status');
const error  = document.getElementById('error');

function addMsg(text, role) {
  const div = document.createElement('div');
  div.className = 'msg ' + role;
  div.textContent = text;              // never innerHTML -> safe
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

addMsg("Hi! Ask about the bootcamp, or say “I want to register”.", "assistant");

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMsg(text, 'user');
  input.value = '';
  send.disabled = true;
  status.textContent = 'Thinking...';
  error.hidden = true;

  try {
    const r = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });
    const data = await r.json();
    if (!data.ok) throw new Error(data.error || 'request failed');

    let answer = data.answer;
    if (data.sources && data.sources.length) {
      answer += '\n\nSources: ' +
        data.sources.map(s => `[FAQ ${s.faq_id}] ${s.question}`).join(' · ');
    }
    addMsg(answer, 'assistant');
  } catch (err) {
    error.hidden = false;
    error.textContent = 'Error: ' + err.message;
  } finally {
    status.textContent = '';
    send.disabled = false;
    input.focus();
  }
});

document.getElementById('new').addEventListener('click', async () => {
  await fetch('/api/new-session', { method: 'POST' });
  chat.replaceChildren();
  error.hidden = true;
  addMsg("New conversation started. How can I help?", "assistant");
});