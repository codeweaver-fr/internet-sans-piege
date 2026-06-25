import { motion } from 'framer-motion'

export default function GridBackground() {
  return (
    <>
      {/* Grille */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,213,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,213,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
      }} />

      {/* Orbe haut-droite */}
      <div style={{
        position: 'fixed', top: '-20%', right: '-10%', zIndex: 0, pointerEvents: 'none',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,213,255,0.07) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      {/* Orbe bas-gauche */}
      <div style={{
        position: 'fixed', bottom: '-20%', left: '-10%', zIndex: 0, pointerEvents: 'none',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      {/* Scan line */}
      <motion.div
        style={{
          position: 'fixed', left: 0, right: 0, height: '1px', zIndex: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,213,255,0.4), transparent)',
          pointerEvents: 'none',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
      />

      {/* Coins */}
      {[
        { top: 16, left: 16,   borderTop: '1px solid', borderLeft: '1px solid'  },
        { top: 16, right: 16,  borderTop: '1px solid', borderRight: '1px solid' },
        { bottom: 16, left: 16,  borderBottom: '1px solid', borderLeft: '1px solid'  },
        { bottom: 16, right: 16, borderBottom: '1px solid', borderRight: '1px solid' },
      ].map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed', width: 24, height: 24,
            borderColor: 'rgba(0,213,255,0.3)',
            pointerEvents: 'none', zIndex: 2, ...s,
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </>
  )
}