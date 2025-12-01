"use client";

import dynamic from "next/dynamic";

const Chat = dynamic(() => import("../components/Chat"), { ssr: false });

export default function ChatRoutePage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <section style={{ width: "100%", maxWidth: 880 }}>
        <Chat height={620} useDefaultTheme={true} style={{ width: "100%" }} />
      </section>
    </main>
  );
}