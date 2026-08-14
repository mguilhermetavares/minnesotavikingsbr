import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fantasy MVB — Temporada 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2a1147 0%, #0a0a0f 60%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background orb */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(79, 38, 131, 0.3)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255, 198, 47, 0.1)",
            filter: "blur(80px)",
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(255,198,47,0.1)",
            border: "1px solid rgba(255,198,47,0.3)",
            borderRadius: "999px",
            padding: "10px 28px",
            marginBottom: "36px",
          }}
        >
          <div style={{ display: "flex", width: "10px", height: "10px", borderRadius: "50%", background: "#FFC62F" }} />
          <div style={{ display: "flex", fontSize: "26px", fontWeight: 700, color: "#FFC62F", letterSpacing: "3px" }}>
            INSCRIÇÕES ABERTAS
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "96px",
              fontWeight: "800",
              color: "white",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            FANTASY <span style={{ color: "#FFC62F" }}>MVB</span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: "28px",
            fontSize: "24px",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "2px",
          }}
        >
          O FANTASY DA TORCIDA MAIS FANÁTICA DO BRASIL
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #4F2683, #FFC62F, #009C3B)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
