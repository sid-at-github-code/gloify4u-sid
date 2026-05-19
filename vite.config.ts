import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { Connect } from "vite";
import type { IncomingMessage, ServerResponse } from "http";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load ALL env vars (empty prefix = no VITE_ filter), so RESEND_KEY is available server-side
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: { overlay: false },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      {
        name: "email-api",
        configureServer(server) {
          server.middlewares.use(
            "/api/send-email",
            async (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
              if (req.method !== "POST") { next(); return; }

              let body = "";
              req.on("data", (chunk: Buffer) => { body += chunk.toString(); });
              req.on("end", async () => {
                try {
                  const { to, subject, html } = JSON.parse(body) as {
                    to: string[];
                    subject: string;
                    html: string;
                  };

                  console.log(`[Email API] → to:${JSON.stringify(to)} | subject:"${subject}" | html:${html.length}B`);

                  const r = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${env.RESEND_KEY}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      from: "Glo from Gloify <onboarding@resend.dev>",
                      to,
                      subject,
                      html,
                    }),
                  });

                  const data = await r.json() as Record<string, unknown>;
                  if (r.ok) {
                    console.log(`[Email API] ✓ Sent OK → id:${data.id}`);
                  } else {
                    console.error(`[Email API] ✗ Resend error HTTP ${r.status}:`, data);
                  }

                  res.setHeader("Content-Type", "application/json");
                  res.statusCode = r.status;
                  res.end(JSON.stringify(data));
                } catch (err) {
                  const msg = (err as Error).message;
                  console.error("[Email API] ✗ Server error:", msg);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: msg }));
                }
              });
            }
          );
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
  };
});
