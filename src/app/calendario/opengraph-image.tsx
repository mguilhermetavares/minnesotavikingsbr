import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt =
  "Calendário Minnesota Vikings Brasil — Jogos, horários e resultados";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logo = await readFile(join(process.cwd(), "public", "logo.jpg"), "base64");

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
          padding: "64px",
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
            background: "rgba(79,38,131,0.3)",
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
            background: "rgba(255,198,47,0.1)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* ImageResponse embeds the local asset directly; next/image is not used here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${logo}`}
          alt="Logo da comunidade Minnesota Vikings Brasil"
          width={144}
          height={144}
          style={{
            borderRadius: "50%",
            border: "3px solid rgba(255,198,47,0.3)",
            marginBottom: "24px",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "4px",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          MINNESOTA VIKINGS BRASIL
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            fontSize: "108px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-2px",
            color: "white",
          }}
        >
          CALENDÁRIO
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "24px",
            fontSize: "30px",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          Jogos, horários e resultados
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
    ),
    { ...size },
  );
}
