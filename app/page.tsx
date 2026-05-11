'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    contact: '',
    story: '',
  });

  const handleSubmit = async () => {
    if (!formData.contact.trim() || !formData.story.trim()) {
      alert('Fill all fields');
      return;
    }

    setIsSending(true);

    try {
      const res = await fetch('/api/send-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);

        setFormData({
          contact: '',
          story: '',
        });

        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false);
        }, 2500);
      } else {
        alert('Server error');
      }
    } catch (e) {
      alert('Connection error');
    }

    setIsSending(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* animated background */}
      <div className="absolute inset-0">

        {/* glow top */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[120px]" />

        {/* glow bottom */}
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

      </div>

      {/* content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">

        {/* top badge */}
        <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60 backdrop-blur-xl">
          Invite Only • Gaming Society
        </div>

        {/* logo */}
        <h1 className="text-6xl font-black tracking-tight md:text-8xl">
          SOKI
        </h1>

        {/* subtitle */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
          A private network for gamers, raiders, grinders and online degenerates.
          Access will require 20 SOKI after public launch.
        </p>

        {/* stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">

          <div>
            <span className="font-bold text-white">37</span> accepted members
          </div>

          <div className="h-4 w-px bg-white/10" />

          <div>
            applications reviewed manually
          </div>

        </div>

        {/* button */}
        <button
          onClick={() => setIsOpen(true)}
          className="mt-12 rounded-2xl border border-white/10 bg-white px-8 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-white/90"
        >
          Request Access
        </button>

      </div>

      {/* modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">

          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">

            {!isSuccess ? (
              <>
                {/* modal header */}
                <div className="mb-8 flex items-start justify-between">

                  <div>
                    <h2 className="text-3xl font-bold">
                      Access Request
                    </h2>

                    <p className="mt-2 text-sm text-white/50">
                      Applications are reviewed manually.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xl text-white/40 transition hover:text-white"
                  >
                    ✕
                  </button>

                </div>

                {/* contact input */}
                <div className="mb-4">

                  <label className="mb-2 block text-sm text-white/50">
                    Contact
                  </label>

                  <input
                    value={formData.contact}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({
                        ...formData,
                        contact: e.target.value,
                      })
                    }
                    placeholder="@telegram / discord / X"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none transition focus:border-white/30"
                  />

                </div>

                {/* story textarea */}
                <div className="mb-6">

                  <label className="mb-2 block text-sm text-white/50">
                    Tell us about yourself
                  </label>

                  <textarea
                    value={formData.story}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData({
                        ...formData,
                        story: e.target.value,
                      })
                    }
                    placeholder="Games, interests, clans, competitive experience..."
                    rows={6}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none transition focus:border-white/30"
                  />

                </div>

                {/* submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSending}
                  className="flex w-full items-center justify-center rounded-2xl bg-white py-4 font-bold text-black transition-all duration-300 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSending ? (
                    <div className="flex items-center gap-3">

                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />

                      Sending...

                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </>
            ) : (
              /* success screen */
              <div className="flex flex-col items-center py-10 text-center">

                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-4xl">
                  ✓
                </div>

                <h2 className="text-3xl font-bold">
                  Application Received
                </h2>

                <p className="mt-4 max-w-md text-white/60">
                  Your request has been sent successfully.
                  If accepted, you will receive an invitation.
                </p>

              </div>
            )}

          </div>

        </div>
      )}

    </main>
  );
}
