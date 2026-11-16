/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        flame: {
          DEFAULT: '#EE6200',
          hover: '#D85700',
          dark: '#B54900',
          light: '#FF7A24',
          50: '#FFF5EB',
          100: '#FFE6D3'
        },
        amber: {
          DEFAULT: '#FF9A00',
          hover: '#E88B00',
          light: '#FFAA24',
          50: '#FFF8E6'
        },
        peach: {
          DEFAULT: '#FBA17E',
          hover: '#F98E66',
          light: '#FDC4AF',
          50: '#FFF6F2',
          100: '#FDECE4'
        },
        cream: {
          DEFAULT: '#F7D794',
          light: '#FDF4DF',
          soft: '#FFF9ED',
          50: '#FFFCF5',
          100: '#FBF0D8',
          200: '#F7D794'
        },
        // Harmonious dark tones for contrast
        charcoal: {
          DEFAULT: '#191310',
          800: '#261C17',
          900: '#110D0A',
          700: '#362820'
        },
        // Aliases mapping to new theme for existing classes
        navy: {
          DEFAULT: '#191310',
          800: '#261C17',
          900: '#110D0A',
          700: '#362820'
        },
        gold: {
          DEFAULT: '#EE6200',
          light: '#FF9A00',
          soft: '#F7D794',
          dark: '#B54900'
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      boxShadow: {
        'flame': '0 10px 25px -5px rgba(238, 98, 0, 0.35)',
        'flame-lg': '0 20px 35px -10px rgba(238, 98, 0, 0.45)',
        'amber': '0 10px 25px -5px rgba(255, 154, 0, 0.35)',
        'warm': '0 8px 30px rgba(238, 98, 0, 0.08)'
      }
    }
  },
  plugins: []
};
