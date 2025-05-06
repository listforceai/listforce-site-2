document.getElementById('hero-form').addEventListener('submit', async e => {
  e.preventDefault();
  const input = document.getElementById('user-input').value.trim();
  const output = document.getElementById('hero-output');
  if (!input) return;
  // “Magic” effect: instantly show what they typed:
  output.textContent = `💫 You asked: “${input}”`;
  // Then after a moment, prompt signup:
  setTimeout(() => {
    output.textContent += `\n👉 Want unlimited AI Real-Estate Magic? Sign up now!`;
  }, 1200);
  // Clear input for next time:
  document.getElementById('user-input').value = '';
});
