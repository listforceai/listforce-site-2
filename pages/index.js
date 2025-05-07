import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const [ask, setAsk] = useState('');
  const [response, setResponse] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: ask }),
    });
    const data = await res.json();
    setResponse(data.text);
  }

  return (
    <>
      <Head>
        <title>ListForce.ai — Your AI Real Estate Assistant</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
        <header className="max-w-7xl mx-auto py-12 px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-indigo-700">
            Your Listings. Supercharged.
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Automate your listing presentations, buyer reports, and marketing — instantly powered by AI.
          </p>

          {status === 'loading' ? (
            <p>Loading session...</p>
          ) : session ? (
            <>
              <p className="mb-4">Welcome, {session.user?.name || 'Agent'}!</p>
              <button
                onClick={() => signOut()}
                className="mb-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <p className="mb-4">You’re not signed in.</p>
              <button
                onClick={() => signIn()}
                className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Sign In
              </button>
            </>
          )}

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex shadow rounded overflow-hidden">
            <input
              value={ask}
              onChange={(e) => setAsk(e.target.value)}
              placeholder="Ask me anything about your property..."
              className="flex-grow px-4 py-3 border-none focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Ask Now
            </button>
          </form>
          {response && (
            <div className="mt-6 bg-white rounded shadow p-4 max-w-lg mx-auto text-left">
              <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
            </div>
          )}
        </header>

        <section className="max-w-7xl mx-auto py-16 px-4 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Instant Reports</h3>
            <p className="text-gray-600">
              Generate professional listing presentations and buyer reports with one click.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Marketing Automation</h3>
            <p className="text-gray-600">
              Automate emails, social posts, and follow-ups to attract and retain leads.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">AI-Powered Insights</h3>
            <p className="text-gray-600">
              Get market analysis, pricing strategy, and recommendations powered by GPT.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto py-16 px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Free</h3>
              <p className="text-4xl font-extrabold mb-4">$0</p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>Watermarked reports</li>
                <li>10 free reports/month</li>
                <li>Email support</li>
              </ul>
              <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Get Started
              </button>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow border-2 border-indigo-600">
              <h3 className="text-xl font-bold mb-4">Pro</h3>
              <p className="text-4xl font-extrabold mb-4">$29</p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>No watermarks</li>
                <li>Unlimited reports</li>
                <li>Editable templates</li>
              </ul>
              <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Upgrade
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Pro Annual</h3>
              <p className="text-4xl font-extrabold mb-4">$299/year</p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>Everything in Pro</li>
                <li>Premium templates</li>
                <li>Priority support</li>
              </ul>
              <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        <footer className="py-8 text-center text-gray-500">
          &copy; 2025 ListForce.ai. All rights reserved.
        </footer>
      </div>
    </>
  );
}


