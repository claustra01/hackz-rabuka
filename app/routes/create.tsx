import { createRoute } from "honox/factory";

export default createRoute((c) => {
  const name = c.req.query("name") ?? "Hono";
  return c.render(
    <div
      style={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: `linear-gradient(to bottom, #ffff00, #ffaa00, #ff5500)`,
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <input
          type="text"
          placeholder="合言葉を入力"
          style={{
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            fontSize: "1.5rem",
            width: "100%",
            boxSizing: "border-box",
            marginBottom: "1rem",
          }}
        />
        <div style={{ display: "flex", gap: 24 }}>
          <button
            style={{
              padding: "1rem 2rem",
              backgroundColor: "#dc2626",
              color: "white",
              borderRadius: "1rem",
              fontSize: "1.5rem",
              fontWeight: "600",
              transition: "background-color 0.3s, transform 0.3s",
              border: "none",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              ":hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            つくる
          </button>
          <button
            style={{
              padding: "1rem 2rem",
              backgroundColor: "#f59e0b",
              color: "white",
              borderRadius: "1rem",
              fontSize: "1.5rem",
              fontWeight: "600",
              transition: "background-color 0.3s, transform 0.3s",
              border: "none",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              ":hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            はいる
          </button>
        </div>
      </div>
    </div>
  );
});
