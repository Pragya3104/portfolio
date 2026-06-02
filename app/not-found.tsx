import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", background: "#04000e",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      padding: "40px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(168,85,247,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.12) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute", top: "20%", left: "30%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(192,132,252,0.1) 0%, transparent 70%)",
        borderRadius: "50%",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 560 }}>
        <div style={{ color: "rgba(192,132,252,0.6)", fontSize: 11, marginBottom: 28, lineHeight: 1.6 }}>
          ┌──────────────────────────────────────────┐<br />
          │  SYSTEM ERROR — KERNEL PANIC             │<br />
          └──────────────────────────────────────────┘
        </div>

        <div style={{ fontSize: 13, lineHeight: 2.2, color: "#9d87bf" }}>
          <div><span style={{ color: "#c084fc" }}>ERR_CODE</span> : 404</div>
          <div><span style={{ color: "#c084fc" }}>PROCESS </span> : route_resolver</div>
          <div><span style={{ color: "#c084fc" }}>STATUS  </span> : <span style={{ color: "#f472b6" }}>PAGE_NOT_FOUND</span></div>
          <div><span style={{ color: "#c084fc" }}>MESSAGE </span> : The requested path does not exist</div>
          <div style={{ marginTop: 16 }}><span style={{ color: "#22d3ee" }}>HINT    </span> : Check the URL or return home</div>
        </div>

        <div style={{ marginTop: 36, borderTop: "1px solid rgba(168,85,247,0.2)", paddingTop: 28 }}>
          <div style={{ color: "#9d87bf", fontSize: 12, marginBottom: 12 }}>
            <span style={{ color: "#c084fc" }}>visitor@pragya</span>
            <span style={{ color: "#9d87bf", margin: "0 4px" }}>:</span>
            <span style={{ color: "#22d3ee" }}>~</span>
            <span style={{ margin: "0 4px" }}>$</span>
            cd /home
          </div>
          <Link href="/" style={{
            display: "inline-block",
            padding: "10px 24px",
            border: "1px solid rgba(192,132,252,0.5)",
            color: "#c084fc", textDecoration: "none", fontSize: 12,
            letterSpacing: "0.08em", transition: "all 0.2s",
            boxShadow: "0 0 12px rgba(192,132,252,0.2)",
          }}>
            [return_home ↵]
          </Link>
        </div>
      </div>
    </div>
  );
}
