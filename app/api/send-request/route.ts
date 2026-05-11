import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contact, experience, role, story } = body;

    // Проверка полей
    if (!contact || !experience || !role || !story) {
      return NextResponse.json({ error: 'Fields are required' }, { status: 400 });
    }

    // Используем переменные окружения или твои значения напрямую (для теста)
    const BOT_TOKEN = '8772895390:AAGSyxW2-hEUTjnhaHFgjIQXN2MEaYBUjqg';
    const CHAT_ID = '1444596921';

    // ВАЖНО: Текст обязательно в обратных кавычках ``
    const message = `
<b>📩 Новая заявка в sokiwrld</b>
<b>👤 Контакт:</b> ${contact}
<b>🎮 Опыт:</b> ${experience}
<b>🛠 Роль:</b> ${role}
<b>📝 О себе:</b> ${story}
`.trim();

    const url = `https://telegram.org{BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('TG Error:', data);
      return NextResponse.json({ error: 'Failed to send to Telegram' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
