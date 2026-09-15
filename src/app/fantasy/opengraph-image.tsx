import { ImageResponse } from "next/og";
import { client } from "@/sanity/client";
import { fantasyStandingsQuery } from "@/sanity/queries";

export const runtime = "edge";
export const alt = "Fantasy MVB — Classificação Geral";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface StandingEntry {
  rank: number;
  teamName: string;
  totalPoints: number;
}

interface FantasyStandings {
  entries: StandingEntry[];
}

export default async function OgImage() {
  const standings = await client.fetch<FantasyStandings | null>(fantasyStandingsQuery);
  const top5 = standings?.entries?.slice(0, 5) ?? [];

  if (top5.length === 0) {
    return new ImageResponse(<FallbackBanner />, { ...size });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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

        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "48px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              fontWeight: 700,
              color: "#FFC62F",
              letterSpacing: "4px",
              marginBottom: "10px",
            }}
          >
            TOP {top5.length || 10} · TEMPORADA 2026
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            CLASSIFICAÇÃO <span style={{ color: "#FFC62F", marginLeft: "18px" }}>GERAL</span>
          </div>
        </div>

        {/* Standings */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "1040px",
            borderRadius: "20px",
            overflow: "hidden",
            border: "2px solid rgba(255,198,47,0.25)",
          }}
        >
          {top5.map((entry, i) => (
            <div
              key={entry.rank}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "16px 32px",
                background:
                  entry.rank === 1
                    ? "rgba(255,198,47,0.15)"
                    : i % 2 === 0
                      ? "rgba(255,255,255,0.03)"
                      : "transparent",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  fontSize: "24px",
                  fontWeight: 800,
                  background: entry.rank === 1 ? "#FFC62F" : "rgba(255,255,255,0.1)",
                  color: entry.rank === 1 ? "#2a1147" : "rgba(255,255,255,0.6)",
                }}
              >
                {entry.rank}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  fontSize: "22px",
                  fontWeight: 800,
                  background: entry.rank === 1 ? "#FFC62F" : "rgba(79,38,131,0.5)",
                  color: entry.rank === 1 ? "#2a1147" : "white",
                  border: "2px solid rgba(255,255,255,0.15)",
                }}
              >
                {entry.teamName.charAt(0).toUpperCase()}
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                {entry.teamName}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "26px",
                  fontWeight: 800,
                  padding: "6px 18px",
                  borderRadius: "8px",
                  background: entry.rank === 1 ? "#FFC62F" : "rgba(255,255,255,0.1)",
                  color: entry.rank === 1 ? "#2a1147" : "white",
                }}
              >
                {entry.totalPoints.toFixed(1)}
              </div>
            </div>
          ))}
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

function FallbackBanner() {
  return (
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

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
          TEMPORADA 2026
        </div>
      </div>

      <div style={{ display: "flex", fontSize: "96px", fontWeight: 800, color: "white", letterSpacing: "-2px" }}>
        FANTASY <span style={{ color: "#FFC62F" }}>MVB</span>
      </div>

      <div style={{ marginTop: "28px", fontSize: "24px", color: "rgba(255,255,255,0.5)", letterSpacing: "2px" }}>
        O FANTASY DA TORCIDA MAIS FANÁTICA DO BRASIL
      </div>

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
  );
}
