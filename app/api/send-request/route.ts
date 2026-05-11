import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const token = '8772895390:AAGSyxW2-hEUTjnhaHFgjIQXN2MeaYBUjqg';
    const chatId = '1444596921';
    
    const text = `🔥 NEW SOKIWRDL APP\n\nContact: ${data.contact}\nSteam: ${data.steam}\nDiscord: ${data.discord}\n\nStory: ${data.story}`;

    const url = `https://telegram.org{token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    const res = await fetch(url);
    if (res.ok) return NextResponse.json({ success: true });
    
    return NextResponse.json({ success: false }, { status: 500 });
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
