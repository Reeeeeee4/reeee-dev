/// <reference types="@cloudflare/workers-types" />
interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return Response.json(
          { success: false, error: "Method not allowed." },
          {
            status: 405,
            headers: { Allow: "POST" }
          }
        );
      }

      try {
        const body: any = await request.json();

        const name = String(body?.name ?? "").trim();
        const email = String(body?.email ?? "").trim();
        const subject = String(body?.subject ?? "").trim();
        const message = String(body?.message ?? "").trim();

        if (!name || !email || !message) {
          return Response.json(
            {
              success: false,
              error: "Name, email, and message are required."
            },
            { status: 400 }
          );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return Response.json(
            {
              success: false,
              error: "Please provide a valid email address."
            },
            { status: 400 }
          );
        }

        await env.DB.prepare(`
          INSERT INTO contact_messages
            (name, email, subject, message, created_at)
          VALUES (?, ?, ?, ?, ?)
        `)
          .bind(
            name,
            email,
            subject || null,
            message,
            new Date().toISOString()
          )
          .run();

        return Response.json({
          success: true,
          message: "Message saved successfully."
        });
      } catch (error) {
        console.error("Contact form submission failed:", error);

        return Response.json(
          {
            success: false,
            error: "Something went wrong while saving your message."
          },
          { status: 500 }
        );
      }
    }

    return env.ASSETS.fetch(request);
  }
};
