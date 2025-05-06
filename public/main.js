document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('magic-form');
  const input     = document.getElementById('prompt-input');
  const output    = document.getElementById('result-output');
  const container = document.getElementById('result-container');
  const stripe    = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const prompt = input.value.trim();
    if (!prompt) return;

    output.textContent = '✨ Generating magic…';
    container.querySelector('.cta-overlay')?.remove();
    output.classList.remove('watermarked');

    const res = await fetch('/api/openai-proxy', {
      method: 'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (res.status === 402) {
      return startCheckout();
    }

    const { text, userIsPaid } = await res.json();
    output.textContent = text.trim();
    if (!userIsPaid) {
      output.classList.add('watermarked');
      injectCTA();
    }
  });

  function injectCTA() {
    const overlay = document.createElement('div');
    overlay.className = 'cta-overlay';
    overlay.innerHTML = `
      <p>This is just a preview. Download the full PDF 👉</p>
      <button id="checkout-btn">Unlock Unlimited Magic</button>
    `;
    container.appendChild(overlay);
    overlay.querySelector('#checkout-btn').onclick = startCheckout;
  }

  async function startCheckout() {
    const { sessionId } = await fetch('/api/create-checkout', { method:'POST' })
      .then(r => r.json());
    await stripe.redirectToCheckout({ sessionId });
  }
});
