const form = document.getElementById('application-form');
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const city = document.getElementById('city');
const track = document.getElementById('track');
const motivation = document.getElementById('motivation');
const terms = document.getElementById('terms');
const charCount = document.getElementById('char-count');
const skillInput = document.getElementById('skill-input');
const addSkillBtn = document.getElementById('add-skill-btn');
const skillsList = document.getElementById('skills-list');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const successScreen = document.getElementById('success-screen');
const applicantName = document.getElementById('applicant-name');
const selectedTrack = document.getElementById('selected-track');
const resetBtn = document.getElementById('reset-btn');

function validateField(input) {
  if (input.id === 'email') {
    if (input.validity.typeMismatch || input.validity.patternMismatch) {
      input.setCustomValidity('Please enter a valid email address.');
    } else {
      input.setCustomValidity('');
    }
  }

  const errorMsg = input.parentElement.querySelector('.error-msg');

  if (!input.checkValidity()) {
    if (errorMsg) {
      errorMsg.textContent = input.validationMessage;
      errorMsg.classList.remove('hidden');
    }
    input.classList.add('border-red-500');
    return false;
  } else {
    if (errorMsg) {
      errorMsg.classList.add('hidden');
    }
    input.classList.remove('border-red-500');
    return true;
  }
}

const inputsToValidate = [fullName, email, phone, city, track, motivation, terms];

inputsToValidate.forEach(input => {
  input.addEventListener('blur', () => {
    validateField(input);
    updateProgress();
  });
  
  input.addEventListener('input', () => {
    validateField(input);
    updateProgress();
  });
});

motivation.addEventListener('input', () => {
  const length = motivation.value.length;
  charCount.textContent = `${length} / 400`;
  
  if (length > 360) {
    charCount.classList.add('text-red-500');
  } else {
    charCount.classList.remove('text-red-500');
  }
});

function addSkill() {
  const value = skillInput.value.trim();
  if (!value) return;

  const existingSkills = Array.from(skillsList.children).map(tag => tag.dataset.value);
  if (existingSkills.includes(value)) return;

  const tag = document.createElement('span');
  tag.dataset.value = value;
  tag.className = 'inline-flex items-center gap-1 bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm';
  tag.innerHTML = `${value} <button type="button" class="remove-skill text-red-500 font-bold ml-1">&times;</button>`;
  
  skillsList.appendChild(tag);
  skillInput.value = '';
}

addSkillBtn.addEventListener('click', addSkill);

skillInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addSkill();
  }
});

skillsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-skill')) {
    e.target.parentElement.remove();
  }
});

function updateProgress() {
  let completed = 0;
  
  if (fullName.value.trim().length >= 2) completed++;
  if (email.checkValidity() && email.value) completed++;
  if (phone.checkValidity() && phone.value) completed++;
  if (city.value.trim()) completed++;
  if (track.value) completed++;
  
  const expChecked = document.querySelector('input[name="experience"]:checked');
  if (expChecked) completed++;
  
  if (motivation.value.trim().length >= 40) completed++;
  if (terms.checked) completed++;

  const percentage = Math.round((completed / 8) * 100);
  
  progressBar.style.width = `${percentage}%`;
  progressBar.setAttribute('aria-valuenow', percentage);
  progressText.textContent = `${percentage}%`;
}

document.querySelectorAll('input[name="experience"]').forEach(radio => {
  radio.addEventListener('change', updateProgress);
});

form.addEventListener('submit', function(event) {
  event.preventDefault();

  let firstInvalid = null;
  let isValid = true;

  inputsToValidate.forEach(input => {
    const valid = validateField(input);
    if (!valid && !firstInvalid) {
      firstInvalid = input;
      isValid = false;
    }
  });

  const expChecked = document.querySelector('input[name="experience"]:checked');
  if (!expChecked && !firstInvalid) {
    firstInvalid = document.querySelector('input[name="experience"]');
    isValid = false;
  }

  if (!isValid) {
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const formData = new FormData(form);
  applicantName.textContent = formData.get('full-name');
  selectedTrack.textContent = formData.get('track');

  form.classList.add('hidden');
  successScreen.classList.remove('hidden');
});

resetBtn.addEventListener('click', () => {
  form.reset();
  skillsList.innerHTML = '';
  updateProgress();
  charCount.textContent = '0 / 400';
  charCount.classList.remove('text-red-500');
  
  inputsToValidate.forEach(input => {
    input.classList.remove('border-red-500');
    const errorMsg = input.parentElement.querySelector('.error-msg');
    if (errorMsg) errorMsg.classList.add('hidden');
  });

  successScreen.classList.add('hidden');
  form.classList.remove('hidden');
});