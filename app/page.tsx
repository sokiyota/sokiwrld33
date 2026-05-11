'use client';
import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    contact: '',
    story: ''
  });

  // ТА САМАЯ ФУНКЦИЯ, КОТОРУЮ НЕ ВИДЕЛ САЙТ
  const handleSubmit = async () => {
    if (!formData.contact || !formData.story) {
      alert('Заполни контакт и свою историю!');
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch('/api/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Заявка отправлена в sokiwrld!');
        setIsOpen(false);
        setFormData({ contact: '', story: '' });
      } else {
        alert('Ошибка на стороне сервера. Проверь route.ts');
      }
    } catch (e) {
      alert('Ошибка соединения');
    }
    setIsSending(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-sans overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 blur-[130px] rounded-full" />

      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          sokiwrld
        </h1>
        <h2 className="text-xl md:text-2xl font-light mb-6 text-gray-400 uppercase tracking-[0.3em]">Where skill meets code</h2>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-sm transition-all hover:bg-gray-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] rounded-sm"
        >
          Connect Wallet
          <div className="absolute -inset-0.5 bg-white opacity-20 blur group-hover:opacity-50 transition duration-500"></div>
        </button>
      </div>

      {/* Анкета-письмо */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="bg-[#0A0A0A] border border-white/10 p-10 w-full max-w-2xl relative rounded-sm shadow-2xl overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors text-xl">✕</button>
            
            <h3 className="text-3xl font-bold mb-2 tracking-tighter uppercase">Application Request</h3>
            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-10 border-b border-white/5 pb-4">Tell us your story.</p>
            
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Contact Info (TG / Discord)</label>
                <input 
                  type="text" 
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  placeholder="@yourname" 
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-white/40 outline-none text-white transition-colors mb-8" 
                />

                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Your Gaming & Industry Dossier</label>
                <textarea 
                  rows={10}
                  value={formData.story}
                  onChange={(e) => setFormData({...formData, story: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-6 text-sm focus:border-white/40 outline-none text-white transition-colors leading-relaxed resize-none"
                  placeholder="Games, Software, Music, Journey..."
                />
              </div>
              
              <button 
                onClick={handleSubmit}
                disabled={isSending}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSending ? 'Sending...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
