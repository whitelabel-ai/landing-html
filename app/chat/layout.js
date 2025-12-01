import "../globals.css";

export const metadata = {
  title: "Chat",
  description: "Chat aislado (Tailwind)",
};

export default function ChatLayout({ children }) {
  return (
    <div style={{ background: "#0b0b0b", minHeight: "100vh" }}>
      {children}
    </div>
  );
}