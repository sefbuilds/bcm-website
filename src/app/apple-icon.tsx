import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1b2a4a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
          color: "#c4572a",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          N
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 18,
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "#b8923e",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          NBCM
        </div>
      </div>
    ),
    { ...size },
  );
}
