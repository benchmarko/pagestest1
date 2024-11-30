// rollup.config.js
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/parser.ts',  // main entry
  output: {
    file: 'dist/pagestest1.js',
    format: 'umd', // "es" ECMAScript-Module
    sourcemap: true,
    name: 'pagestest1',
    globals: {
      'ohm-js': 'ohmJs'
    }
  },
  plugins: [typescript()],
};
