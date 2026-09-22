import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#031B3D",
          color: "white",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 28, color: "#12BFF3", letterSpacing: 4 }}>
          MAP & MERGE TECHNOLOGIES
        </div>
        <div style={{ fontSize: 64, marginTop: 24, fontWeight: 600, lineHeight: 1.1 }}>
          {siteConfig.tagline}
        </div>
        <div style={{ fontSize: 28, marginTop: 28, color: "#D7ECF8", maxWidth: 860 }}>
          Philippines-based MuleSoft and enterprise integration consulting.
        </div>
      </div>
    ),
    size,
  );
}
