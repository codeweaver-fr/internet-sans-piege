/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'isp-bg':      '#081220',
        'isp-surface': '#0d2035',
        'isp-surface2':'#112540',
        'isp-text':    '#e8f4ff',
        'isp-muted':   '#7aa8c7',
        'isp-cyan':    '#00D5FF',
        'isp-green':   '#00FF88',
        'isp-yellow':  '#FFB800',
        'isp-red':     '#FF4A4A',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      borderRadius: {
        'isp': '10px',
      },
      keyframes: {
        scanline: {
          '0%':   { top: '0%',   opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      animation: {
        scanline:   'scanline 4s linear infinite',
        fadeUp:     'fadeUp 0.4s ease forwards',
        pulseGlow:  'pulseGlow 2s ease-in-out infinite',
        blink:      'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}