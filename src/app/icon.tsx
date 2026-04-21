import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1b2a4a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
          fontSize: 22,
          fontWeight: 700,
          color: "#c4572a",
          letterSpacing: "-0.02em",
        }}
      >
        N
      </div>
    ),
    { ...size },
  );
}
