import { useState } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')

  async function handleGenerate() {
    const res = await fetch('/api/openai-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })
    const { text } = await res.json()
    setResult(text)
  }

  return (
    <main style={{ fontFamily: 'system-ui, -apple-system', padding: 20 }}>
      <h1>ListForce.ai</h1>
      <textarea
        rows={4}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Ask your question…"
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={handleGenerate}>Generate Magic</button>

      {result && (
        <div style={{ position: 'relative', marginTop: 20 }}>
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            pointerEvents: 'none',
            background: 'url("/watermark.png") center/cover',
            opacity: 0.2
          }} />
          <pre style={{ filter: 'blur(2px)', padding: 20 }}>{result}</pre>
          <a href="/api/create-checkout">
            <button>Upgrade for Full Access</button>
          </a>
        </div>
      )}
    </main>
  )
}

