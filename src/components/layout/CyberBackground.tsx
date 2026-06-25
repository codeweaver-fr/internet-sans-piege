import { motion } from "framer-motion";

export default function CyberBackground() {
  return (
    <>
      <div className="isp-grid-bg" />

      {/* Halo central */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "1200px",
            height: "1200px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,213,255,0.16) 0%, rgba(0,213,255,0.06) 32%, transparent 70%)",
            filter: "blur(46px)",
          }}
        />
      </div>

      {/* Radar premium */}
      <motion.div
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          width: "820px",
          height: "820px",
          marginLeft: "-410px",
          marginTop: "-410px",
          borderRadius: "50%",
          border: "1px solid rgba(0,213,255,0.1)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.82,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 72,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "15%",
            borderRadius: "50%",
            border: "1px solid rgba(0,213,255,0.08)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "30%",
            borderRadius: "50%",
            border: "1px solid rgba(0,213,255,0.08)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "45%",
            borderRadius: "50%",
            border: "1px solid rgba(0,213,255,0.12)",
            boxShadow: "0 0 22px rgba(0,213,255,0.16)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: "1px",
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent, rgba(0,213,255,0.14), transparent)",
            transform: "translateX(-50%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(0,213,255,0.14), transparent)",
            transform: "translateY(-50%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(0,213,255,0.18) 28deg, rgba(0,213,255,0.05) 52deg, transparent 90deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "10px",
            height: "10px",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "rgba(0,213,255,0.65)",
            boxShadow: "0 0 22px rgba(0,213,255,0.75)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "62%",
            top: "34%",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "rgba(0,255,136,0.7)",
            boxShadow: "0 0 18px rgba(0,255,136,0.55)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "28%",
            top: "58%",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "rgba(255,184,0,0.7)",
            boxShadow: "0 0 16px rgba(255,184,0,0.45)",
          }}
        />
      </motion.div>

      {/* Scan line */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, rgba(0,213,255,0.75), transparent)",
          boxShadow: "0 0 18px rgba(0,213,255,0.48)",
          zIndex: 1,
          pointerEvents: "none",
        }}
        animate={{
          y: ["-10vh", "110vh"],
          opacity: [0, 0.75, 0.75, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Données système discrètes */}
      <div
        style={{
          position: "fixed",
          left: "5vw",
          top: "18vh",
          zIndex: 0,
          pointerEvents: "none",
          fontFamily: "Space Mono, monospace",
          fontSize: "10px",
          lineHeight: 1.9,
          letterSpacing: "1px",
          color: "rgba(0,213,255,0.08)",
          textTransform: "uppercase",
        }}
      >
        <div>AUTH_STATUS: SECURE</div>
        <div>SCAN_MODE: ACTIVE</div>
        <div>THREAT_DB: UPDATED</div>
        <div>USER_SESSION: ENCRYPTED</div>
      </div>

      <div
        style={{
          position: "fixed",
          right: "5vw",
          bottom: "18vh",
          zIndex: 0,
          pointerEvents: "none",
          fontFamily: "Space Mono, monospace",
          fontSize: "10px",
          lineHeight: 1.9,
          letterSpacing: "1px",
          color: "rgba(0,213,255,0.07)",
          textAlign: "right",
          textTransform: "uppercase",
        }}
      >
        <div>PHISHING_FILTER: ON</div>
        <div>SMS_ANALYSIS: READY</div>
        <div>IDENTITY_CHECK: STANDBY</div>
        <div>RISK_SCORE: PENDING</div>
      </div>

      {/* Coins HUD */}
      <div className="isp-corner isp-corner--tl" />
      <div className="isp-corner isp-corner--tr" />
      <div className="isp-corner isp-corner--bl" />
      <div className="isp-corner isp-corner--br" />
    </>
  );
}