import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

/* ═══════════════════════════════════════════════════════════
   OG Image — Obsidian & Ember edition
   ═══════════════════════════════════════════════════════════
   Layout:
     ┌─────────────────────────────────────────────────┐
     │  ◆ ARDHISOKO              [live pulse pill]     │
     │                                                 │
     │  Where Kenya                                    │
     │  finds land.          ← gradient text           │
     │                                                 │
     │  ─── ember divider ───                          │
     │                                                 │
     │  Verified titles · 47 counties · M-Pesa ready   │
     │                                                 │
     │  08,400 LISTINGS   47 COUNTIES   120K ACRES     │
     └─────────────────────────────────────────────────┘
   ═══════════════════════════════════════════════════════════ */

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: "72px",
          // Cream base — matches your light theme surface
          background: "#FFF9F2",
          fontFamily: "system-ui, -apple-system, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* ─── Ambient ember blobs ─────────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: "-180px",
            right: "-160px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255, 165, 61, 0.55) 0%, rgba(255, 165, 61, 0) 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-220px",
            left: "-180px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(47, 107, 47, 0.28) 0%, rgba(47, 107, 47, 0) 65%)",
            display: "flex",
          }}
        />

        {/* ─── Diagonal ember sliver (top-right brand mark) ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "360px",
            height: "360px",
            background:
              "linear-gradient(135deg, rgba(255, 165, 61, 0.22) 0%, rgba(201, 96, 10, 0.08) 55%, transparent 100%)",
            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
            display: "flex",
          }}
        />

        {/* ─── Fine grain / dot texture overlay ────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.35,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle, rgba(43, 26, 10, 0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ═══════════════════════════════════════════════════
            CONTENT — foreground layer
            ═══════════════════════════════════════════════════ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "relative",
          }}
        >
          {/* ─── Top row — wordmark + live pill ─────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Wordmark with mark */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              {/* ◆ Ember diamond mark */}
              <div
                style={{
                  display: "flex",
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #FFA53D 0%, #C9600A 100%)",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 20px -6px rgba(255, 165, 61, 0.55)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "16px",
                    height: "16px",
                    background: "#1A0F03",
                    transform: "rotate(45deg)",
                    borderRadius: "2px",
                  }}
                />
              </div>

              {/* Wordmark */}
              <div
                style={{
                  display: "flex",
                  fontSize: "34px",
                  fontWeight: 800,
                  color: "#2B1A0A",
                  letterSpacing: "-0.035em",
                }}
              >
                ArdhiSoko
              </div>
            </div>

            {/* Live pulse pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                borderRadius: "999px",
                background: "rgba(201, 96, 10, 0.10)",
                border: "1px solid rgba(201, 96, 10, 0.22)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#C9600A",
                  boxShadow: "0 0 12px rgba(201, 96, 10, 0.7)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#C9600A",
                  letterSpacing: "0.02em",
                }}
              >
                LIVE · 8,400 LISTINGS
              </div>
            </div>
          </div>

          {/* ─── Headline block ─────────────────────────── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "112px",
                fontWeight: 800,
                color: "#2B1A0A",
                letterSpacing: "-0.05em",
                lineHeight: 0.98,
              }}
            >
              <div style={{ display: "flex" }}>Where Kenya</div>
              <div
                style={{
                  display: "flex",
                  color: "#C9600A",
                  textShadow: "0 0 40px rgba(255, 165, 61, 0.35)",
                }}
              >
                finds land.
              </div>
            </div>

            {/* Ember divider */}
            <div
              style={{
                display: "flex",
                width: "140px",
                height: "4px",
                marginTop: "32px",
                borderRadius: "999px",
                background:
                  "linear-gradient(90deg, #FFA53D 0%, #C9600A 100%)",
                boxShadow: "0 0 20px rgba(255, 165, 61, 0.5)",
              }}
            />

            {/* Tagline */}
            <div
              style={{
                display: "flex",
                fontSize: "26px",
                color: "#5A4632",
                marginTop: "24px",
                maxWidth: "820px",
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
              }}
            >
              Verified title deeds. Real sellers. All 47 counties.
            </div>
          </div>

          {/* ─── Bottom stat row ────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0px",
              width: "100%",
            }}
          >
            <Stat
              value="8,400"
              label="Live listings"
              borderRight
            />
            <Stat
              value="47"
              label="Counties covered"
              borderRight
            />
            <Stat
              value="120K"
              label="Acres listed"
              borderRight={false}
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}

/* ═══════════════════════════════════════════════════════════
   Sub-components — inline (Satori doesn't support imports)
   ═══════════════════════════════════════════════════════════ */

function Stat({
  value,
  label,
  borderRight,
}: {
  value: string;
  label: string;
  borderRight: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingRight: borderRight ? "40px" : "0",
        paddingLeft: borderRight ? "0" : "40px",
        borderRight: borderRight
          ? "1px solid rgba(43, 26, 10, 0.12)"
          : "none",
        marginRight: borderRight ? "40px" : "0",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "38px",
          fontWeight: 800,
          color: "#2B1A0A",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "14px",
          fontWeight: 600,
          color: "#8A7050",
          marginTop: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.14em",
        }}
      >
        {label}
      </div>
    </div>
  );
}