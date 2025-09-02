import { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Redirect ORO PURO",
  description: "Redirect ORO PURO",
  generator: "ORO PURO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* Pixel base */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !(function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                  n.callMethod
                    ? n.callMethod.apply(n, arguments)
                    : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = "2.0";
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
              })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
              fbq("init", "${process.env.NEXT_PUBLIC_META_PIXEL_ID}");
              fbq("track", "PageView");
            `,
          }}
        />

        {/* Simulación de botón oculto para Lead */}
        <Script
          id="lead-event"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener("DOMContentLoaded", function () {
                // Crear botón oculto
                const hiddenBtn = document.createElement("button");
                hiddenBtn.id = "hidden-lead-button";
                hiddenBtn.style.display = "none";
                document.body.appendChild(hiddenBtn);

                // Asociar evento fbq al botón
                hiddenBtn.addEventListener("click", function () {
                  if (typeof window.fbq === "function") {
                    fbq("track", "Lead", {
                      content_name: "WhatsApp Redirect",
                      value: 0,
                      currency: "USD",
                    });
                    console.log("Evento Lead enviado a Meta");
                  }
                });

                // Simular click automático
                setTimeout(() => {
                  hiddenBtn.click();
                }, 1000); // dispara a los 1s
              });
            `,
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
