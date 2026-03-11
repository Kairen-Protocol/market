import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ember: '#ff7a18',
        sand: '#f4ead7',
        soot: '#0e0b09',
        brass: '#d8a34b',
        fog: '#d7d0c5',
      },
    },
  },
  plugins: [],
};

export default config;
