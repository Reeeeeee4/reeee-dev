export async function onRequestPost({ request, env }: any) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim();
    const subject = String(body?.subject ?? '').trim();
    const message = String(body?.message ?? '').trim();

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return Response.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!env.DB) {
      return Response.json(
        { success: false, error: 'Database is not configured.' },
        { status: 500 }
      );
    }

    await env.DB.prepare(`
      INSERT INTO contact_messages (name, email, subject, message, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).bind(name, email, subject || null, message, new Date().toISOString()).run();

    return Response.json({ success: true, message: 'Message saved successfully.' });
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return Response.json(
      { success: false, error: 'Something went wrong while saving your message.' },
      { status: 500 }
    );
  }
};
