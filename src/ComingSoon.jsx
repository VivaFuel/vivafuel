import React, { useState, useEffect } from 'react';

export default function ComingSoon(){
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 200); // smooth fade-in
  }, []);

  async function submitForm(e){
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/xovkrrwq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if(!res.ok){ throw new Error('Formspree error'); }
      setSent(true);
      setEmail('');
    } catch (err) {
      console.error(err);
      alert('Unable to subscribe right now. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-[0_6px_24px_rgba(31,41,55,0.06)] p-10 text-center">
        
        {/* LOGO */}
       <img src="/logo.png" alt="VivaFuel Logo" className="mx-auto mb-10 w-64 sm:w-80 animate-fadeIn" />


        <h1 className="text-3xl md:text-4xl font-semibold mb-3">Fuel Your Glow. Coming Soon.</h1>
        <p className="text-sm md:text-base text-[#6B7280] mb-6">
          Beauty-forward supplements designed to boost energy, radiance, and confidence. Sign up for launch perks.
        </p>

        {sent ? (
          <div className="text-sm font-medium text-green-600">Thanks — you’re on the list! Check your inbox for a confirmation.</div>
        ) : (
          <form onSubmit={submitForm} className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <input
              required
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full sm:w-72 p-3 rounded-lg border border-[#E5E7EB] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF7A9A]"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#FFB6C1] to-[#FF7A9A] text-white font-semibold disabled:opacity-70"
            >
              {loading ? 'Sending…' : 'Get Early Access'}
            </button>
          </form>
        )}

        <p className="text-xs text-[#9CA3AF] mt-4">Join the waitlist — exclusive launch discount inside.</p>

        <div className="mt-8 text-sm text-[#6B7280] space-y-2">
          <div>Follow us on <a href="https://www.tiktok.com/@vivafuel23" className="underline" target="_blank" rel="noreferrer">TikTok @vivafuel23</a></div>
          <div>Contact: <a href="mailto:support@vivafuel.com" className="underline">support@vivafuel.com</a></div>
        </div>
      </div>
    </div>
  )
}
