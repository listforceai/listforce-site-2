import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt) return;
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/openai-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setResult(data.text || 'No response');
    } catch (err) {
      console.error(err);
      setResult('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>ListForce AI</h1>
      <p className={styles.subhead}>Your Real-Estate Assistant (&lt;$1/day)</p>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Enter a prompt…"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleGenerate} className={styles.button} disabled={loading}>
          {loading ? 'Generating…' : 'Generate Magic'}
        </button>
      </div>
      {result && <pre className={styles.output}>{result}</pre>}
    </div>
  );
}

