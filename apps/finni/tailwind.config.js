const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const {heroui} = require("@heroui/react");
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
    join(
      __dirname,
      '../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
    ),
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            danger: '#fe615c',
            foreground: '#585056',
            success: '#9bccc8',
            primary: {
              DEFAULT: '#fe615c',
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: '#e1dacd',
              foreground: '#585056',
            },
          },
        },
      },
    }),
  ],
};
