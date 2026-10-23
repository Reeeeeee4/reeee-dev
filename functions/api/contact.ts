
interface Env {
  DB: D1Database;
  TURNSTILE_SECRET_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json() as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      turnstileToken?: string;
    };

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const subject = body.subject?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const token = body.turnstileToken?.trim() ?? "";

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!token) {
      return Response.json(
        { success: false, error: "Please complete the spam verification." },
        { status: 400 }
      );
    }

    
    // Verify the token with Cloudflare Turnstile.
    if (!env.TURNSTILE_SECRET_KEY) {
      console.error("TURNSTILE_SECRET_KEY is missing.");
      return Response.json(
        { success: false, error: "Spam verification is not configured." },
        { status: 500 }
      );
    }

    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const verification = await verificationResponse.json() as {
      success: boolean;
      hostname?: string;
      "error-codes"?: string[];
    };

    if (!verificationResponse.ok || !verification.success) {
      console.error("Turnstile verification failed:", {
        hostname: verification.hostname,
        errorCodes: verification["error-codes"],
      });

      return Response.json(
        {
          success: false,
          error: "Spam verification failed. Please try again.",
          errorCodes: verification["error-codes"] ?? [],
          hostname: verification.hostname ?? null,
        },
        { status: 403 }
      );
    }

    // Optional: restrict accepted hostnames after confirming the actual hostname.
    const allowedHostnames = [
      "reeee-dev.pages.dev",
      // Add your actual custom domain here if you use one.
    ];

    if (!allowedHostnames.includes(verification.hostname ?? "")) {
      console.error("Unexpected Turnstile hostname:", verification.hostname);

      return Response.json(
        {
          success: false,
          error: "The website hostname is not allowed.",
          hostname: verification.hostname ?? null,
        },
        { status: 403 }
      );
    }

    // Save only after successful verification.
    await env.DB.prepare(`
      INSERT INTO contact_messages
        (name, email, subject, message, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      name,
      email,
      subject || null,
      message,
      new Date().toISOString()
    ).run();

    return Response.json({
      success: true,
      message: "Message saved successfully.",
    });
  } catch (error) {
    console.error("Contact form submission failed:", error);

    return Response.json(
      { success: false, error: "Unable to save your message." },
      { status: 500 }
    );
  }
};
